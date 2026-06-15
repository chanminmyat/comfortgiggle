import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CheckCircle2 } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl border border-clay bg-cream p-10 text-center md:p-12">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-olive/10 p-4 text-olive">
              <CheckCircle2 className="h-10 w-10" strokeWidth={1.5} />
            </div>
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
            Payment Complete
          </p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">Thank You</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink/70">
            Your confirmation has been received. Our team will review the details and continue with
            the next step.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center bg-olive px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-olive-dark"
          >
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
