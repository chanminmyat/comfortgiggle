import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const authFieldClass =
  "w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:border-ember focus:outline-none focus:ring-1 focus:ring-ember disabled:opacity-60";
export const authLabelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-bone/60";
export const authButtonClass =
  "w-full bg-ember px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-bone focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-dark disabled:cursor-not-allowed disabled:opacity-60";

export function AuthShell({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto w-full max-w-md">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">{eyebrow}</p>
                <h1 className="mt-3 font-display text-4xl uppercase tracking-wide text-bone md:text-5xl">
                  {title}
                </h1>
                <p className="mt-4 text-sm leading-7 text-bone/70">{intro}</p>
              </div>

              <div className="mt-8 border border-bone/15 bg-charcoal-dark p-8">{children}</div>

              {footer ? <div className="mt-6 text-center text-sm text-bone/60">{footer}</div> : null}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-ember underline-offset-4 hover:text-bone hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ember"
    >
      {children}
    </Link>
  );
}

export function AuthMessage({ tone, children }: { tone: "error" | "success"; children: React.ReactNode }) {
  const toneClass =
    tone === "error"
      ? "border-red-500/40 bg-red-500/10 text-red-200"
      : "border-ember/40 bg-ember/10 text-bone";
  return (
    <p role="alert" className={`mb-5 border px-3 py-2.5 text-sm leading-6 ${toneClass}`}>
      {children}
    </p>
  );
}

export function AuthUnconfigured() {
  return (
    <AuthShell
      eyebrow="Account"
      title="Accounts are unavailable"
      intro="Sign-in isn't set up on this site yet. Please contact us and we'll help with your order."
    >
      <p className="text-sm leading-7 text-bone/70">
        If you were expecting to sign in, reach out at{" "}
        <a className="text-ember hover:underline" href="mailto:hello@comfortgiggles.com">
          hello@comfortgiggles.com
        </a>
        .
      </p>
    </AuthShell>
  );
}
