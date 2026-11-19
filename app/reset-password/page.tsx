"use client";

import { useEffect, useState } from "react";
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

const MIN_PASSWORD_LENGTH = 8;

type LinkState = "checking" | "ready" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [linkState, setLinkState] = useState<LinkState>("checking");
  const [linkError, setLinkError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLinkState("invalid");
      return;
    }

    let cancelled = false;

    async function resolveRecovery() {
      // Supabase surfaces an expired or already-used link as an error in the
      // URL fragment rather than as a failed request.
      const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const hashError = hashParams.get("error_description") || hashParams.get("error");
      if (hashError) {
        if (cancelled) return;
        setLinkError(hashError.replace(/\+/g, " "));
        setLinkState("invalid");
        return;
      }

      // PKCE-style links arrive as ?code=…; implicit ones are already consumed
      // by detectSessionInUrl before this effect runs.
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        const { error: exchangeError } = await supabase!.auth.exchangeCodeForSession(code);
        if (exchangeError && !cancelled) {
          setLinkError(exchangeError.message);
          setLinkState("invalid");
          return;
        }
      }

      const { data } = await supabase!.auth.getSession();
      if (cancelled) return;
      setLinkState(data.session ? "ready" : "invalid");
    }

    resolveRecovery();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isSupabaseAuthConfigured()) return <AuthUnconfigured />;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("Those passwords don't match.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/account");
      router.refresh();
    }, 1500);
  }

  if (linkState === "checking") {
    return (
      <AuthShell eyebrow="Account" title="Set a password" intro="Checking your reset link…">
        <p className="text-sm text-bone/60">One moment.</p>
      </AuthShell>
    );
  }

  if (linkState === "invalid") {
    return (
      <AuthShell
        eyebrow="Account"
        title="This link has expired"
        intro="Reset links can only be used once, and they expire after an hour."
        footer={
          <>
            <AuthLink href="/forgot-password">Request a new link</AuthLink>
          </>
        }
      >
        {linkError ? <AuthMessage tone="error">{linkError}</AuthMessage> : null}
        <p className="text-sm leading-7 text-bone/70">
          Ask for a fresh link and open it from the same device you requested it on.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Account"
      title="Set a password"
      intro="Choose a password for your Comfort Giggles account."
    >
      {done ? (
        <AuthMessage tone="success">Password updated. Taking you to your account…</AuthMessage>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {error ? <AuthMessage tone="error">{error}</AuthMessage> : null}

          <div className="mb-5">
            <label className={authLabelClass} htmlFor="password">
              New password <span aria-hidden="true">*</span>
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

          <div className="mb-6">
            <label className={authLabelClass} htmlFor="confirm-password">
              Confirm password <span aria-hidden="true">*</span>
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              required
              autoComplete="new-password"
              className={authFieldClass}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={submitting}
            />
          </div>

          <button type="submit" className={authButtonClass} disabled={submitting}>
            {submitting ? "Saving…" : "Save password"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
