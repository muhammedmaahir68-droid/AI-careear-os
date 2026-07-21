// src/lib/api.ts

import { supabase } from "./supabase";

export { supabase };

/**
 * Generic fetch – returns the rows or throws an error.
 */
export async function fetchTable<T>(table: string, opts?: { select?: string; eq?: [string, any]; order?: string }): Promise<T[]> {
  let query: any = supabase.from(table).select(opts?.select || "*");
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
  const { data, error } = await supabase.from(table).upsert(rows as any, { onConflict: "id" }).select();
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
    .from(table)
    .update(changes as any)
    .eq(filter.column, filter.value)
    .select();
  if (error) {
    throw new Error(`Failed to update ${table}: ${error.message}`);
  }
  return data as T[];
}

/**
 * Generic delete – removes rows matching a filter.
 */
export async function deleteRows<T>(table: string, filter: { column: string; value: any }): Promise<void> {
  const { error } = await supabase.from(table).delete().eq(filter.column, filter.value);
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
  let filterStr = undefined;
  if (filter) {
    filterStr = `${filter.column}=eq.${filter.value}`;
  }
  
  const channel = supabase.channel(`public:${table}`)
    .on('postgres_changes', { event: '*', schema: 'public', table, filter: filterStr }, (payload: any) => {
      onChange({ new: payload.new as T, old: payload.old as T });
    })
    .subscribe();
    
  return channel;
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
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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
