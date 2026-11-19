"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Both of these name the AUTH project — the same one lib/supabase/admin.ts
// provisions checkout accounts into. Never the shared checkout-intents project.
const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim();

let cachedClient: SupabaseClient | null = null;

export function isSupabaseAuthConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/**
 * Browser client for shopper-facing auth. Returns null when the site has no
 * Supabase credentials so the pages can render a plain message instead of
 * crashing the whole route.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseAuthConfigured()) return null;
  if (cachedClient) return cachedClient;

  cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // Recovery links land on /reset-password carrying their tokens in the URL;
      // this is what turns them into a session we can call updateUser with.
      detectSessionInUrl: true,
    },
  });

  return cachedClient;
}
