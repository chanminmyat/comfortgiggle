import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function AntiDiscriminationPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Anti-Discrimination Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  Comfort Zone has a zero-tolerance policy for discrimination. We are an inclusive
                  community welcoming individuals of all backgrounds.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Protected Classes</h2>
                <p>
                  Discrimination based on race, color, religion, gender, gender identity, sexual
                  orientation, national origin, genetics, disability, or age is strictly prohibited.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Violations</h2>
                <ul className="space-y-2">
                  <li>
                    Refusal of Service: Freelancers may not decline a consult based on a client’s
                    membership in a protected class.
                  </li>
                  <li>
                    Harassment: Any form of slurs, hate speech, or harassment during a virtual consult
                    or in chat will result in immediate permanent suspension.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Reporting</h2>
                <p>
                  If you experience discrimination, report it immediately to hello@comfortzone.com.
                  All reports are investigated with high priority.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
                <p>
                  For questions regarding any of these policies, please contact us:
                </p>
                <div className="space-y-2">
                  <p>
                    Comfort Zone Address: 300 S Biscayne Blvd Ste 3904, Miami, FL 33131
                  </p>
                  <p>Phone: 305-427-9067</p>
                  <p>Email: hello@comfortzone.com</p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Customer Service Hours</h2>
                <ul className="space-y-2">
                  <li>Monday - Friday: 9:00 AM – 5:00 PM EST</li>
                  <li>Saturday: 10:00 AM – 3:00 PM EST</li>
                  <li>Sunday: Closed</li>
                </ul>
              </section>

              <section className="space-y-3">
                <p className="text-sm text-gray-500">Last Updated: December 2025</p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
