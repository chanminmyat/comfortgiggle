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

const MIN_PASSWORD_LENGTH = 8;

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isSupabaseAuthConfigured()) return <AuthUnconfigured />;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSubmitting(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/sign-in`,
        data: {
          first_name: firstName.trim() || undefined,
          last_name: lastName.trim() || undefined,
          created_via: "register",
        },
      },
    });
    setSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSubmitted(true);
  }

  return (
    <AuthShell
      eyebrow="Account"
      title="Create an account"
      intro="Already ordered from us? An account may already exist for your billing email — use “Forgot password?” instead."
      footer={
        <>
          Already have an account? <AuthLink href="/sign-in">Sign in</AuthLink>
        </>
      }
    >
      {submitted ? (
        <div>
          <AuthMessage tone="success">
            Check your email to confirm the address, then sign in.
          </AuthMessage>
          <p className="text-sm leading-7 text-bone/70">
            If an account already existed for that address, nothing has changed — use{" "}
            <AuthLink href="/forgot-password">Forgot password?</AuthLink> to get into it.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

          <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={authLabelClass} htmlFor="first-name">
                First name
              </label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                className={authFieldClass}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                disabled={submitting}
              />
            </div>
            <div>
              <label className={authLabelClass} htmlFor="last-name">
                Last name
              </label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                className={authFieldClass}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

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
              minLength={MIN_PASSWORD_LENGTH}
              autoComplete="new-password"
              className={authFieldClass}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-describedby="password-hint"
              disabled={submitting}
            />
            <p id="password-hint" className="mt-2 text-xs leading-6 text-bone/50">
              At least {MIN_PASSWORD_LENGTH} characters.
            </p>
          </div>

          <button type="submit" className={authButtonClass} disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
