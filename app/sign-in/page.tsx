"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isSupabaseAuthConfigured()) return <AuthUnconfigured />;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    setSubmitting(false);

    if (signInError) {
      // Shoppers provisioned at checkout have a password nobody knows, so the
      // most likely reason for landing here is that they never claimed it.
      setError(
        signInError.message === "Invalid login credentials"
          ? "That email and password don't match. If you ordered from us before, use “Forgot password?” to set a password for the first time."
          : signInError.message,
      );
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <AuthShell
      eyebrow="Account"
      title="Sign in"
      intro="Access your Comfort Giggles account to see your details."
      footer={
        <>
          New here? <AuthLink href="/register">Create an account</AuthLink>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

        <div className="mb-5">
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
            disabled={submitting}
          />
        </div>

        <div className="mb-6">
          <label className={authLabelClass} htmlFor="password">
            Password <span aria-hidden="true">*</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={authFieldClass}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={submitting}
          />
        </div>

        <button type="submit" className={authButtonClass} disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <p className="mt-5 text-center text-sm text-bone/60">
          <AuthLink href="/forgot-password">Forgot password?</AuthLink>
        </p>
      </form>
    </AuthShell>
  );
}
