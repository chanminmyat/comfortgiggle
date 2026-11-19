"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { getSupabaseBrowserClient, isSupabaseAuthConfigured } from "@/lib/supabase/client";
import {
  AuthShell,
  AuthLink,
  AuthUnconfigured,
  authButtonClass,
} from "@/components/auth-shell";

function detail(user: User, key: string) {
  const value = (user.user_metadata || {})[key];
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    supabase.auth.getUser().then(({ data }) => {
      if (cancelled) return;
      setUser(data.user);
      setLoading(false);
      if (!data.user) router.replace("/sign-in");
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, [router]);

  if (!isSupabaseAuthConfigured()) return <AuthUnconfigured />;

  async function handleSignOut() {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/sign-in");
    router.refresh();
  }

  if (loading) {
    return (
      <AuthShell eyebrow="Account" title="Your account" intro="Loading your details…">
        <p className="text-sm text-bone/60">One moment.</p>
      </AuthShell>
    );
  }

  if (!user) {
    return (
      <AuthShell
        eyebrow="Account"
        title="Your account"
        intro="You need to be signed in to see this page."
        footer={<AuthLink href="/sign-in">Go to sign in</AuthLink>}
      >
        <p className="text-sm leading-7 text-bone/70">Redirecting you to sign in.</p>
      </AuthShell>
    );
  }

  const firstName = detail(user, "first_name");
  const lastName = detail(user, "last_name");
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const phone = detail(user, "phone");

  return (
    <AuthShell
      eyebrow="Account"
      title="Your account"
      intro={fullName ? `Signed in as ${fullName}.` : "You're signed in."}
    >
      <dl className="space-y-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/60">Email</dt>
          <dd className="mt-1 break-words text-bone">{user.email}</dd>
        </div>
        {fullName ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/60">Name</dt>
            <dd className="mt-1 text-bone">{fullName}</dd>
          </div>
        ) : null}
        {phone ? (
          <div>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/60">Phone</dt>
            <dd className="mt-1 text-bone">{phone}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8 space-y-3">
        <button type="button" onClick={handleSignOut} className={authButtonClass}>
          Sign out
        </button>
        <p className="text-center text-sm text-bone/60">
          <AuthLink href="/forgot-password">Change your password</AuthLink>
        </p>
      </div>
    </AuthShell>
  );
}
