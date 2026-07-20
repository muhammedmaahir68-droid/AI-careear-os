import { createClient } from "@supabase/supabase-js";

// Replace these with your actual Supabase project URL and anon key
// Get them from: https://supabase.com → Your Project → Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Database = {
  profiles: {
    id: string;
    name: string;
    email: string;
    xp: number;
    streak: number;
    level: number;
    dream_company: string;
    avatar_url: string;
    completed_modules: number;
    created_at: string;
  };
  daily_progress: {
    id: string;
    user_id: string;
    day: number;
    completed_steps: number[];
    score: number;
    created_at: string;
  };
  leaderboard: {
    user_id: string;
    display_name: string;
    avatar_url: string;
    weekly_xp: number;
    total_xp: number;
    rank: number;
  };
};
