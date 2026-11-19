import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function projectHost(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
}

// Auth lives in the project the public Supabase URL names. Deliberately NOT the
// SUPABASE_URL-first order used by lib/checkout-intents.ts: that one points at
// the shared checkout-intents project, and a user created there could never be
// signed in to.
const authUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim().replace(/\/$/, "");
const intentsUrl = (process.env.SUPABASE_URL || "").trim().replace(/\/$/, "");

// SUPABASE_SERVICE_ROLE_KEY belongs to whichever project SUPABASE_URL names, so
// it is only safe to reuse when both point at the same project.
const sameProject = !intentsUrl || projectHost(intentsUrl) === projectHost(authUrl);
const serviceRoleKey = (
  process.env.SUPABASE_AUTH_SERVICE_ROLE_KEY ||
  (sameProject ? process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY : "") ||
  ""
).trim();

let cachedClient: SupabaseClient | null = null;
let warned = false;

/**
 * Service-role client for the AUTH project. Bypasses RLS and can call the
 * GoTrue admin API, so this must NEVER be imported from a Client Component.
 *
 * Returns null when unconfigured rather than throwing: the site still has to
 * render and take payments without Supabase credentials present.
 */
export function getSupabaseAdmin() {
  if (!authUrl) return null;

  if (!serviceRoleKey) {
    if (!warned) {
      warned = true;
      if (!sameProject) {
        console.error(
          "[supabase/admin] SUPABASE_URL and NEXT_PUBLIC_SUPABASE_URL are different projects " +
            `(${projectHost(intentsUrl)} vs ${projectHost(authUrl)}). SUPABASE_SERVICE_ROLE_KEY ` +
            "belongs to the former, so it cannot be used for auth. Set " +
            "SUPABASE_AUTH_SERVICE_ROLE_KEY to a service role key for the auth project.",
        );
      } else {
        console.warn("[supabase/admin] no service role key configured; account provisioning is off");
      }
    }
    return null;
  }

  if (cachedClient) return cachedClient;

  cachedClient = createClient(authUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cachedClient;
}
