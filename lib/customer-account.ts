import "server-only";

import crypto from "node:crypto";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type CustomerAccountDetails = {
  email: unknown;
  firstName?: unknown;
  lastName?: unknown;
  phone?: unknown;
  merchantSite?: unknown;
};

/**
 * Provisions a Supabase account for a shopper arriving through the ComfortPay
 * checkout flow. The password is cryptographically random and disclosed to
 * nobody, including us: the account exists so it can be linked to and claimed
 * later through a recovery link, not so anyone can sign in with a known secret.
 *
 * Never throws. Account provisioning must not be able to block a checkout.
 */
export async function ensureCustomerAccount(details: CustomerAccountDetails) {
  const email = clean(details.email).toLowerCase();
  if (!email || !isValidEmail(email)) return { created: false };

  const admin = getSupabaseAdmin();
  if (!admin) {
    console.warn("[customer-account] Supabase service role not configured; skipping provisioning");
    return { created: false };
  }

  // Generated, used once, discarded.
  const password = crypto.randomBytes(32).toString("base64url");

  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    // The address is already the verified billing contact. Without this the row
    // stays unconfirmed and Supabase refuses to issue a recovery link for it.
    email_confirm: true,
    user_metadata: {
      first_name: clean(details.firstName) || undefined,
      last_name: clean(details.lastName) || undefined,
      phone: clean(details.phone) || undefined,
      merchant_site: clean(details.merchantSite) || undefined,
      created_via: "checkout",
    },
  });

  if (!error) return { created: true };

  // Postgres owns the uniqueness constraint, so this conflict IS the atomic
  // "already provisioned" answer. Checking first would both cost a full table
  // page-through (admin.listUsers has no email filter) and still race.
  // createUser never mutates an existing row, so there is nothing to overwrite.
  if (error.code === "email_exists") return { created: false };

  console.error("[customer-account] failed to provision account", error.code, error.message);
  return { created: false };
}
