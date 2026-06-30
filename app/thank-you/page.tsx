'use client';

import { useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

function formatAmount(value: string | null) {
  const amount = Number(value || 0);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export default function ThankYouPage() {
  const searchParams = useSearchParams();
  const order = searchParams.get('order');
  const method = searchParams.get('method');
  const amount = formatAmount(searchParams.get('amount'));

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
          Your checkout was completed . We have received your order and will continue with the next step.
        </p>

        {(order || method || amount) ? (
          <div className="mx-auto mt-6 max-w-md border border-bone/15 bg-soot/60 p-5 text-left text-sm text-bone/80">
            {order ? (
              <div className="flex justify-between gap-4 py-1.5">
                <span className="text-bone/60">Order</span>
                <span className="font-medium text-bone">{order}</span>
              </div>
            ) : null}
            {method ? (
              <div className="flex justify-between gap-4 py-1.5">
                <span className="text-bone/60">Method</span>
                <span className="font-medium capitalize text-bone">{method}</span>
              </div>
            ) : null}
            {amount ? (
              <div className="flex justify-between gap-4 py-1.5">
                <span className="text-bone/60">Amount</span>
                <span className="font-medium text-bone">{amount}</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  );
}
