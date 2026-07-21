// src/lib/api.ts

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ------------------------------------------------------------
// Supabase client – reads env vars set in Vercel or .env files
// ------------------------------------------------------------
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("❌ Supabase URL or ANON KEY missing – check your .env files");
  // In a real app we would throw, but this file is just for compilation.
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Generic fetch – returns the rows or throws an error.
 */
export async function fetchTable<T>(table: string, opts?: { select?: string; eq?: [string, any]; order?: string }): Promise<T[]> {
  let query: any = supabase.from<T>(table).select(opts?.select || "*");
  if (opts?.eq) {
    query = query.eq(opts.eq[0], opts.eq[1]);
  }
  if (opts?.order) {
    query = query.order(opts.order);
  }
  const { data, error } = await query;
  if (error) {
    throw new Error(`Failed to fetch ${table}: ${error.message}`);
  }
  return data as T[];
}

/**
 * Generic insert – upserts rows (on conflict of primary key).
 */
export async function upsertRows<T>(table: string, rows: T[]): Promise<T[]> {
  const { data, error } = await supabase.from<T>(table).upsert(rows, { onConflict: "id" });
  if (error) {
    throw new Error(`Failed to upsert ${table}: ${error.message}`);
  }
  return data as T[];
}

/**
 * Generic update – updates rows matching a filter.
 */
export async function updateRows<T>(table: string, filter: { column: string; value: any }, changes: Partial<T>): Promise<T[]> {
  const { data, error } = await supabase
    .from<T>(table)
    .update(changes)
    .eq(filter.column, filter.value);
  if (error) {
    throw new Error(`Failed to update ${table}: ${error.message}`);
  }
  return data as T[];
}

/**
 * Generic delete – removes rows matching a filter.
 */
export async function deleteRows<T>(table: string, filter: { column: string; value: any }): Promise<void> {
  const { error } = await supabase.from<T>(table).delete().eq(filter.column, filter.value);
  if (error) {
    throw new Error(`Failed to delete from ${table}: ${error.message}`);
  }
}

// Helper for real‑time subscription (e.g., leaderboard, daily tasks)
export function subscribe<T>(
  table: string,
  onChange: (payload: { new: T | null; old: T | null }) => void,
  filter?: { column: string; value: any }
) {
  let query = supabase.from<T>(table);
  if (filter) {
    query = query.eq(filter.column, filter.value);
  }
  const subscription = query
    .on("INSERT", (payload) => onChange(payload))
    .on("UPDATE", (payload) => onChange(payload))
    .on("DELETE", (payload) => onChange(payload))
    .subscribe();
  return subscription;
}

/**
 * OpenAI helper – on‑demand explanations.
 * Returns the raw text response from the model.
 */
export async function getAIExplanation(prompt: string): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0,
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}

/**
 * Simple ATS scoring – returns a 0‑100 confidence that a resume matches a job description.
 */
export async function scoreResume(resumeText: string, jobDescription: string): Promise<number> {
  const prompt = `Score this resume against the following job description on a 0‑100 scale for ATS friendliness. Provide only the numeric score.\n\nResume:\n${resumeText}\n\nJob Description:\n${jobDescription}`;
  const raw = await getAIExplanation(prompt);
  const num = parseInt(raw, 10);
  if (Number.isNaN(num)) return 0;
  return Math.min(100, Math.max(0, num));
}
