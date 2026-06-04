import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-2xl bg-white p-12 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500 p-4 shadow-md">
            <XCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-red-700">
          Checkout Cancelled
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Payment Not Completed</h1>
        <p className="text-base leading-relaxed text-gray-500">
          Your checkout was cancelled. No confirmation was recorded. You can return to checkout anytime.
        </p>
      </div>
    </main>
  );
}
