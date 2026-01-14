import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function DisputeResolutionChargebackPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Dispute Resolution &amp; Chargeback Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  We strive for satisfaction in every consultation. This policy outlines how we
                  handle service disagreements and payment disputes.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Dispute Process</h2>
                <p>
                  If a client is dissatisfied with a virtual consult, they must contact Customer
                  Service within 48 hours of the appointment.
                </p>
                <ul className="space-y-2">
                  <li>Email: hello@comfortzone.com</li>
                  <li>
                    Review: We will review chat logs, call duration, and deliverables to mediate a
                    resolution.
                  </li>
                  <li>
                    Resolution: Remedies may include a partial refund, full refund, or a credit for
                    a future consult, at the sole discretion of Comfort Zone.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Chargeback Policy</h2>
                <p>
                  Filing a chargeback with your bank without first contacting Comfort Zone Support is
                  a violation of our Terms.
                </p>
                <ul className="space-y-2">
                  <li>
                    Friendly Fraud: If a chargeback is filed for a valid service rendered, we reserve
                    the right to dispute the chargeback using evidence of service delivery (logs,
                    timestamps).
                  </li>
                  <li>
                    Account Ban: Users who file fraudulent chargebacks will be permanently banned
                    from the platform.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Binding Arbitration</h2>
                <p>
                  Any unresolved disputes shall be settled by binding arbitration in the State of
                  Delaware, in accordance with the rules of the American Arbitration Association.
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
