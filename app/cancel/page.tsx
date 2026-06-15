import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-20">
        <div className="w-full max-w-xl border border-clay bg-cream p-10 text-center md:p-12">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-red-500/10 p-4 text-red-600">
              <XCircle className="h-10 w-10" strokeWidth={1.5} />
            </div>
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-taupe">
            Checkout Cancelled
          </p>
          <h1 className="font-serif text-4xl text-ink md:text-5xl">Payment Not Completed</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-ink/70">
            Your checkout was cancelled and no confirmation was recorded. You can return to checkout
            anytime.
          </p>
          <Link
            href="/checkout"
            className="mt-8 inline-flex items-center justify-center border border-ink/30 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-white"
          >
            Return to Checkout
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
