import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AntiFraudPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Anti-Fraud Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  To protect our community, we employ strict measures to detect and prevent
                  fraudulent activity.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Verification</h2>
                <ul className="space-y-2">
                  <li>
                    Identity Checks: We reserve the right to request ID verification (KYC) from
                    Clients or Freelancers for high-value transactions or suspicious account activity.
                  </li>
                  <li>
                    IP Monitoring: We monitor IP addresses to detect unauthorized access or location
                    spoofing.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Transaction Monitoring</h2>
                <p>
                  Our systems automatically flag suspicious transaction patterns. If a transaction
                  is flagged, we may place a temporary hold on the funds and request confirmation
                  from the cardholder via phone or email.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Reporting Fraud</h2>
                <p>
                  If you suspect your account has been compromised, contact us immediately at
                  1-202-800-7298.
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
