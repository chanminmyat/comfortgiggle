import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function DataProcessingAgreementPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Data Processing Agreement (DPA) Statement</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  This section outlines how we (the Data Controller) and our third-party vendors
                  (Data Processors) handle your personal information in compliance with global
                  privacy standards.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Scope of Processing</h2>
                <p>We process data necessary to facilitate virtual consultations, including:</p>
                <ul className="space-y-2">
                  <li>Contact details (Name, Email, Phone).</li>
                  <li>Transaction data (processed securely via PCI-DSS compliant gateways).</li>
                  <li>Session logs (time and duration of consults).</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Sub-Processors</h2>
                <p>We utilize trusted third-party sub-processors to deliver services, including:</p>
                <ul className="space-y-2">
                  <li>Payment Gateways (e.g., Stripe, PayPal).</li>
                  <li>Video Conferencing Tools (e.g., Zoom, Google Meet).</li>
                  <li>Cloud Hosting Providers.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Data Transfer</h2>
                <p>
                  As a Delaware-formed entity, data is processed in the United States. By using our
                  services, international clients consent to the transfer of data to the US. We
                  utilize standard contractual clauses where necessary to ensure data protection.
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
