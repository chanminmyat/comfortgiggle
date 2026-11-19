"use client";

import { useState } from "react";
import { getSupabaseBrowserClient, isSupabaseAuthConfigured } from "@/lib/supabase/client";
import {
  AuthShell,
  AuthLink,
  AuthMessage,
  AuthUnconfigured,
  authButtonClass,
  authFieldClass,
  authLabelClass,
} from "@/components/auth-shell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isSupabaseAuthConfigured()) return <AuthUnconfigured />;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSubmitting(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/reset-password` },
    );
    setSubmitting(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  return (
    <AuthShell
      eyebrow="Account"
      title="Reset your password"
      intro="We'll email you a link to set a new password. If you've ordered from us before, this is also how you claim the account created with your order."
      footer={
        <>
          Remembered it? <AuthLink href="/sign-in">Back to sign in</AuthLink>
        </>
      }
    >
      {sent ? (
        <div>
          <AuthMessage tone="success">
            If an account exists for that address, a reset link is on its way. The link expires after
            an hour.
          </AuthMessage>
          <p className="text-sm leading-7 text-bone/70">
            Check your spam folder if it hasn&apos;t arrived in a few minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

          <div className="mb-6">
            <label className={authLabelClass} htmlFor="email">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={authFieldClass}
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-describedby="email-hint"
              disabled={submitting}
            />
            <p id="email-hint" className="mt-2 text-xs leading-6 text-bone/50">
              Use the email address you gave at checkout.
            </p>
          </div>

          <button type="submit" className={authButtonClass} disabled={submitting}>
            {submitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
