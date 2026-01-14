'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            These terms govern use of our website and services. Please read them carefully.
          </p>

          <div className="max-w-3xl mx-auto space-y-8">
            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-600">
                By accessing or using our services, you agree to these terms and all applicable
                policies.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold mb-2">Orders and Payments</h2>
              <p className="text-gray-600">
                Orders are subject to availability and confirmation. Pricing, taxes, and fees are
                shown at checkout.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold mb-2">Shipping and Returns</h2>
              <p className="text-gray-600">
                Shipping timelines and return eligibility are outlined in our related policies.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold mb-2">User Responsibilities</h2>
              <p className="text-gray-600">
                You agree not to misuse the site, interfere with operations, or violate any laws
                while using our services.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
              <p className="text-gray-600">
                To the fullest extent permitted by law, we are not liable for indirect or
                consequential damages.
              </p>
            </section>

            <section className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p className="text-gray-600">
                For questions about these terms, please contact us through the details provided on
                our website.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
