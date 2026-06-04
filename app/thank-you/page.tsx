import { CheckCircle } from 'lucide-react';

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-4 py-16">
      <div className="w-full max-w-xl rounded-2xl bg-white p-12 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-green-500 p-4 shadow-md">
            <CheckCircle className="h-10 w-10 text-white" strokeWidth={2.5} />
          </div>
        </div>
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-green-700">
          Payment Complete
        </p>
        <h1 className="mb-4 text-4xl font-extrabold text-gray-900">Thank You</h1>
        <p className="text-base leading-relaxed text-gray-500">
          Your confirmation has been received. Our team will review the details and continue with the next step.
        </p>
      </div>
    </main>
  );
}
