import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CancelPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-xl w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500 rounded-full p-4 shadow-md">
              <XCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-red-700 font-bold uppercase tracking-widest text-sm mb-3">
            Checkout Cancelled
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Not Completed</h1>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            Your checkout was cancelled. No confirmation was recorded. You can return to checkout anytime.
          </p>
          <Button asChild variant="outline">
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
