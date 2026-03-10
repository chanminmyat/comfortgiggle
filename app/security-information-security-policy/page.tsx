import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function SecurityInformationSecurityPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Security &amp; Information Security Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  Comfort Giggle is committed to maintaining the confidentiality, integrity, and
                  availability of client and freelancer data.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Technical Safeguards</h2>
                <ul className="space-y-2">
                  <li>
                    SSL Encryption: All data transmitted between your browser and our servers is
                    encrypted using Secure Socket Layer (SSL) technology.
                  </li>
                  <li>
                    Access Control: Access to sensitive user data is restricted to authorized
                    personnel with a legitimate business need.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Payment Security</h2>
                <p>
                  We do not store full credit card numbers on our servers. All financial
                  transactions are processed through PCI-DSS Level 1 compliant payment processors.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Incident Response</h2>
                <p>
                  In the event of a data breach, Comfort Giggle will notify affected users and
                  relevant regulatory bodies within the timeframes mandated by Delaware law and
                  applicable federal regulations.
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
