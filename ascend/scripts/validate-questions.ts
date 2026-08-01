// Structural quality gate for questions awaiting approval.
// Run with server-side credentials only: npm run validate-questions

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

interface QuestionRow {
  id: string;
  content: string;
  answer: string;
  explanation: string | null;
}

async function validatePendingQuestions() {
  const { data, error } = await supabase
    .from("questions")
    .select("id, content, answer, explanation")
    .eq("status", "pending")
    .limit(200);
  if (error) throw error;

  let approved = 0;
  let rejected = 0;
  for (const question of (data ?? []) as QuestionRow[]) {
    const isValid = question.content.trim().length >= 10
      && question.answer.trim().length > 0
      && (question.explanation?.trim().length ?? 0) >= 10;
    const { error: updateError } = await supabase
      .from("questions")
      .update({ status: isValid ? "approved" : "rejected", quality_score: isValid ? 1 : 0 })
      .eq("id", question.id);
    if (updateError) throw updateError;
    if (isValid) approved += 1;
    else rejected += 1;
  }

  console.log(`Validation complete: ${approved} approved, ${rejected} rejected.`);
}

validatePendingQuestions().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
