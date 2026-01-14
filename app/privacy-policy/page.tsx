'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const sections = [
  'Privacy Policy',
  'Cookie Policy',
  'Shipping Policy',
  'Security & Information Security Policy',
  'Refund & Return Policy',
  'Record Retention Policy',
  'Freelancer & Third-Party Provider Policy',
  'Dispute Resolution & Chargeback Policy',
  'Data Processing Agreement (DPA) Statement',
  'Clear Pricing Policy',
  'Anti-Fraud Policy',
  'Anti-Discrimination Policy',
  'Accessibility Statement',
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Privacy Policy</h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            This page outlines our policies and statements. Each section below provides the
            applicable terms and disclosures.
          </p>

          <div className="max-w-3xl mx-auto space-y-8">
            {sections.map((title) => (
              <section key={title} className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">
                  Details for this section will be provided here.
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
