import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-soot px-4 py-20 font-sans text-bone">
      <div className="w-full max-w-xl border border-bone/15 bg-charcoal-dark p-10 text-center md:p-12">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-ember/15 p-4 text-ember">
            <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
          </div>
        </div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-bone/60">
          Payment Complete
        </p>
        <h1 className="font-display text-4xl text-bone md:text-5xl">Thank You</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-bone/70">
          Your confirmation has been received. Our team will review the details and continue with
          the next step.
        </p>
      </div>
    </main>
  );
}
