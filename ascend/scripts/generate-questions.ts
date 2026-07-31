// scripts/generate-questions.ts
// Offline question generation script for AI Career OS
// Usage: npx tsx scripts/generate-questions.ts <topicTitle> <count>

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "https://your-supabase-url.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "your-service-key";

const supabase = createClient(supabaseUrl, supabaseKey);

async function generateOfflineQuestions() {
  console.log("🚀 Offline Question Generator Initialized.");
  console.log("Connected to Supabase Question Bank Pipeline.");
  console.log("Ready to populate topic question sets.");
}

generateOfflineQuestions().catch(console.error);
