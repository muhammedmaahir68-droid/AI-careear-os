import { supabase } from "./supabase";

const DAILY_QUESTION_COUNT = 40;
type Difficulty = "easy" | "medium" | "hard";

interface TopicLevel { topic_id: string; mastery: number; }
interface QuestionCandidate { id: string; topic_id: string | null; difficulty: Difficulty | null; }

export function mapMasteryToDifficulty(mastery: number): Difficulty {
  if (mastery < 0.4) return "easy";
  if (mastery < 0.75) return "medium";
  return "hard";
}

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

async function getStartingTopics(): Promise<TopicLevel[]> {
  const { data, error } = await supabase.from("topics").select("id").limit(10);
  if (error) throw error;
  return (data ?? []).map((topic) => ({ topic_id: topic.id, mastery: 0 }));
}

/** Creates one stable, adaptive daily set per user. Safe to call repeatedly. */
export async function generateDailyQuiz(userId: string) {
  const quizDate = new Date().toISOString().slice(0, 10);
  const { data: existing, error: existingError } = await supabase.from("daily_quiz_sets").select("*").eq("user_id", userId).eq("quiz_date", quizDate).maybeSingle();
  if (existingError) throw existingError;
  if (existing) return existing;

  const { data: savedLevels, error: levelsError } = await supabase.from("user_topic_mastery").select("topic_id, mastery").eq("user_id", userId);
  if (levelsError) throw levelsError;
  const levels = (savedLevels?.length ? savedLevels : await getStartingTopics()) as TopicLevel[];
  if (!levels.length) throw new Error("No topics are available yet. Seed course topics before generating a quiz.");

  const weightedTopics = levels.map((level) => ({ ...level, weight: level.mastery < 0.5 ? 3 : level.mastery < 0.8 ? 2 : 1 }));
  const totalWeight = weightedTopics.reduce((total, topic) => total + topic.weight, 0);
  const questionIds = new Set<string>();

  for (const topic of weightedTopics) {
    const targetCount = Math.max(1, Math.round((topic.weight / totalWeight) * DAILY_QUESTION_COUNT));
    const { data, error } = await supabase.from("questions").select("id, topic_id, difficulty").eq("topic_id", topic.topic_id).eq("status", "approved").eq("difficulty", mapMasteryToDifficulty(topic.mastery));
    if (error) throw error;
    shuffle((data ?? []) as QuestionCandidate[]).slice(0, targetCount).forEach((question) => questionIds.add(question.id));
  }

  if (questionIds.size < DAILY_QUESTION_COUNT) {
    const { data: fallbackQuestions, error } = await supabase.from("questions").select("id").eq("status", "approved").limit(200);
    if (error) throw error;
    shuffle(fallbackQuestions ?? []).forEach((question) => { if (questionIds.size < DAILY_QUESTION_COUNT) questionIds.add(question.id); });
  }

  const { data: created, error: createError } = await supabase.from("daily_quiz_sets").insert({ user_id: userId, quiz_date: quizDate, question_ids: [...questionIds] }).select().single();
  if (createError) throw createError;
  return created;
}

export async function recordAdaptiveAttempt({ userId, quizId, questionId, topicId, isCorrect, givenAnswer, timeTakenSeconds }: { userId: string; quizId: string; questionId: string; topicId: string | null; isCorrect: boolean; givenAnswer?: string; timeTakenSeconds?: number; }) {
  const { error: attemptError } = await supabase.from("daily_quiz_attempts").upsert({ daily_quiz_id: quizId, user_id: userId, question_id: questionId, topic_id: topicId, given_answer: givenAnswer ?? null, is_correct: isCorrect, time_taken_seconds: timeTakenSeconds ?? null }, { onConflict: "daily_quiz_id,question_id" });
  if (attemptError) throw attemptError;
  if (!topicId) return;

  const { data: current, error: currentError } = await supabase.from("user_topic_mastery").select("mastery, correct_streak, wrong_streak").eq("user_id", userId).eq("topic_id", topicId).maybeSingle();
  if (currentError) throw currentError;
  const mastery = Math.min(1, Math.max(0, (current?.mastery ?? 0) + (isCorrect ? 0.04 : -0.06)));
  const { error: masteryError } = await supabase.from("user_topic_mastery").upsert({ user_id: userId, topic_id: topicId, mastery, current_difficulty: mapMasteryToDifficulty(mastery), correct_streak: isCorrect ? (current?.correct_streak ?? 0) + 1 : 0, wrong_streak: isCorrect ? 0 : (current?.wrong_streak ?? 0) + 1, last_practiced_at: new Date().toISOString(), updated_at: new Date().toISOString() }, { onConflict: "user_id,topic_id" });
  if (masteryError) throw masteryError;
}
