import { createClient } from "@supabase/supabase-js";

// Service role key - server only, never ship this to the frontend.
// Frontend keeps using the public anon key it already has.
const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.warn(
    "[supabase] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing. " +
    "Set them in server/.env before starting the server."
  );
}

export const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});
