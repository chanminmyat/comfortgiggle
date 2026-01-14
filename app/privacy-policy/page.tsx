import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-4xl font-bold mb-6'>Privacy Policy</h1>

            <div className='space-y-8 text-gray-700'>
              <section className='space-y-3'>
                <p className='text-sm text-gray-500'>
                  Last Updated: December 2025 <br />
                  Effective Date: December 1, 2025 <br />
                  Website: www.comfortzone.com
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  1. Introduction
                </h2>
                <p>
                  Comfort Zone ("we," "us," or "our") respects your privacy and
                  is committed to protecting your personal data. This Privacy
                  Policy explains how we collect, use, disclose, and safeguard
                  your information when you visit our website and use our
                  services to book virtual consultations with freelancers.
                </p>
                <p>
                  By accessing or using our Site, you consent to the data
                  practices described in this policy.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  2. Information We Collect
                </h2>
                <p>
                  We collect information that identifies, relates to, describes,
                  references, is capable of being associated with, or could
                  reasonably be linked to a particular consumer or device
                  ("Personal Information").
                </p>

                <div className='space-y-2'>
                  <p className='font-medium text-gray-900'>
                    2.1 Information You Provide to Us
                  </p>
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>
                      Account Registration: Name, email address, phone number,
                      and password.
                    </li>
                    <li>
                      Transaction Data: Billing address and payment confirmation
                      details. We do not store full credit or debit card
                      numbers. Payments are processed by PCI-DSS compliant
                      providers such as Stripe or PayPal.
                    </li>
                    <li>
                      Consultation Details: Notes, files, or images you upload
                      for your consultation.
                    </li>
                    <li>
                      Communications: Correspondence with Customer Service or
                      chat logs with Freelancers.
                    </li>
                  </ul>
                </div>

                <div className='space-y-2'>
                  <p className='font-medium text-gray-900'>
                    2.2 Information We Collect Automatically
                  </p>
                  <ul className='list-disc pl-5 space-y-1'>
                    <li>
                      Usage Data: Pages visited, time spent, and click activity.
                    </li>
                    <li>
                      Device Data: IP address, browser type, operating system,
                      and device identifiers.
                    </li>
                    <li>Cookies and similar tracking technologies.</li>
                  </ul>
                </div>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  3. How We Use Your Information
                </h2>
                <ul className='list-decimal pl-5 space-y-1'>
                  <li>Service Delivery and account management.</li>
                  <li>
                    Communication regarding bookings, updates, and security
                    notices.
                  </li>
                  <li>Customer support and inquiries.</li>
                  <li>Fraud prevention and platform security.</li>
                  <li>Legal and regulatory compliance.</li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  4. Sharing Your Information
                </h2>
                <p>
                  We do not sell your personal information. We may share data in
                  the following cases:
                </p>

                <ul className='list-disc pl-5 space-y-1'>
                  <li>
                    With Freelancers: Your name and relevant consultation
                    details are shared to conduct the session.
                  </li>
                  <li>
                    With Service Providers: Trusted vendors assisting with
                    payments, email delivery, and hosting services.
                  </li>
                  <li>For Legal Obligations or valid government requests.</li>
                  <li>During mergers, acquisitions, or asset transfers.</li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  5. Data Retention
                </h2>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>
                    Account data is retained while your account remains active.
                  </li>
                  <li>
                    Transaction records are retained for at least 7 years for
                    tax and accounting compliance.
                  </li>
                  <li>Marketing data is retained until you opt out.</li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  6. Security of Your Data
                </h2>
                <p>
                  We implement administrative, technical, and physical
                  safeguards including SSL encryption and restricted access
                  controls. However, no method of transmission over the Internet
                  is completely secure.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  7. International Data Transfers
                </h2>
                <p>
                  Comfort Zone is a U.S.-based company. If you access our
                  services from outside the United States, your information may
                  be transferred to and processed in the U.S.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  8. Your Privacy Rights
                </h2>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>Right to Access your personal data.</li>
                  <li>Right to Correct inaccurate information.</li>
                  <li>Right to Request deletion under certain conditions.</li>
                </ul>
                <p>Requests can be submitted to hello@comfortzone.com.</p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  9. California Residents (CCPA & CPRA)
                </h2>
                <p>
                  California residents have additional rights including the
                  right to know, delete, correct, and opt out of data sharing
                  for advertising purposes.
                </p>
                <p>
                  Our Site does not currently respond to Do Not Track (DNT)
                  signals.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  10. Children’s Privacy
                </h2>
                <p>
                  Our services are not intended for children under 13 (or 16
                  where applicable). We do not knowingly collect personal data
                  from children.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  11. Changes to This Privacy Policy
                </h2>
                <p>
                  We may update this policy periodically. Updates will be posted
                  on this page with a revised "Last Updated" date.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  12. Contact Us
                </h2>
                <div className='space-y-2'>
                  <p>
                    Comfort Zone Privacy Compliance Officer <br />
                    Address: 8 The Green Suite B, Dover, DE 19901
                  </p>
                  <p>Phone: 1-202-800-7298</p>
                  <p>Email: hello@comfortzone.com</p>
                </div>
              </section>

              <section>
                <p className='text-sm text-gray-500'>
                  Last Updated: December 2025
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
