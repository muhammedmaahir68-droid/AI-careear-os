import { Router } from "express";
import { supabase } from "../lib/supabase.js";

const router = Router();

// POST /api/tests/start
// body: { userId, roleId?, topicId?, companyId?, questionCount?, timeLimitSeconds? }
router.post("/start", async (req, res) => {
  const {
    userId, roleId = null, topicId = null, companyId = null,
    questionCount = 10, timeLimitSeconds = 1800,
  } = req.body;

  if (!userId) return res.status(400).json({ error: "userId is required" });
  if (!roleId && !topicId && !companyId) {
    return res.status(400).json({ error: "One of roleId, topicId, or companyId is required" });
  }

  // Pull a random set of questions matching the scope.
  let query = supabase.from("questions").select("id, question, answer, difficulty, topic_id, company_id");
  if (topicId) query = query.eq("topic_id", topicId);
  if (companyId) query = query.eq("company_id", companyId);
  if (roleId && !topicId) {
    const { data: topics } = await supabase.from("syllabus_topics").select("id").eq("role_id", roleId);
    const topicIds = (topics || []).map((t) => t.id);
    query = query.in("topic_id", topicIds);
  }

  const { data: pool, error: poolErr } = await query;
  if (poolErr) return res.status(500).json({ error: poolErr.message });
  if (!pool || pool.length === 0) {
    return res.status(404).json({ error: "No questions found for this scope" });
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, Math.min(questionCount, pool.length));

  const { data: attempt, error: attemptErr } = await supabase
    .from("test_attempts")
    .insert({
      user_id: userId, role_id: roleId, topic_id: topicId, company_id: companyId,
      question_count: selected.length, time_limit_seconds: timeLimitSeconds,
    })
    .select().single();

  if (attemptErr) return res.status(500).json({ error: attemptErr.message });

  res.json({ attempt, questions: selected });
});

// POST /api/tests/:attemptId/answer
// body: { questionId, selfMarkedCorrect, timeSpentSeconds }
router.post("/:attemptId/answer", async (req, res) => {
  const { attemptId } = req.params;
  const { questionId, selfMarkedCorrect, timeSpentSeconds } = req.body;

  const { error } = await supabase.from("test_answers").insert({
    attempt_id: attemptId,
    question_id: questionId,
    self_marked_correct: selfMarkedCorrect,
    time_spent_seconds: timeSpentSeconds,
  });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ status: "recorded" });
});

// POST /api/tests/:attemptId/complete
router.post("/:attemptId/complete", async (req, res) => {
  const { attemptId } = req.params;

  const { data: answers, error: ansErr } = await supabase
    .from("test_answers").select("self_marked_correct").eq("attempt_id", attemptId);
  if (ansErr) return res.status(500).json({ error: ansErr.message });

  const correct = (answers || []).filter((a) => a.self_marked_correct).length;
  const total = (answers || []).length;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;

  const { data: attempt, error } = await supabase
    .from("test_attempts")
    .update({ completed_at: new Date().toISOString(), status: "completed", score })
    .eq("id", attemptId)
    .select().single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ attempt, correct, total, score });
});

// GET /api/tests/history/:userId
router.get("/history/:userId", async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from("test_attempts")
    .select("id, role_id, topic_id, company_id, question_count, score, status, started_at, completed_at")
    .eq("user_id", userId)
    .order("started_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json({ attempts: data });
});

export default router;
