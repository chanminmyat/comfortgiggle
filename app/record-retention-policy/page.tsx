import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function RecordRetentionPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Record Retention Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  We retain data only as long as necessary for business operations and legal
                  compliance.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">User Accounts</h2>
                <p>
                  Active account data is retained indefinitely to provide service history. You may
                  request account deletion at any time, subject to retention required for financial
                  audits.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Financial Records</h2>
                <p>
                  In accordance with tax laws, transaction records, invoices, and payment history
                  are retained for a minimum of 7 years.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Communication Logs</h2>
                <p>
                  Messages and consultation logs regarding disputes are retained for 2 years.
                  Routine logs may be purged periodically to optimize system performance.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
