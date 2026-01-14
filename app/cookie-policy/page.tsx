import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Last Updated: December 1, 2025</p>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Use of Cookies</h2>
                <p>Our website uses cookies to:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Enhance Your Experience: Remember preferences, login information, and items in your cart.</li>
                  <li>Analytics: Understand site traffic via tools like Google Analytics.</li>
                  <li>Marketing: Deliver relevant ads (if applicable).</li>
                </ol>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Types of Cookies We Use</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-700">Category</th>
                        <th className="px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-700">Purpose</th>
                        <th className="px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-700">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2 border-b border-gray-200">Necessary</td>
                        <td className="px-4 py-2 border-b border-gray-200">Essential for site functionality</td>
                        <td className="px-4 py-2 border-b border-gray-200">Session cookies</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b border-gray-200">Performance</td>
                        <td className="px-4 py-2 border-b border-gray-200">Analyze site usage</td>
                        <td className="px-4 py-2 border-b border-gray-200">Google Analytics</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 border-b border-gray-200">Functionality</td>
                        <td className="px-4 py-2 border-b border-gray-200">Remember your preferences</td>
                        <td className="px-4 py-2 border-b border-gray-200">Language, login settings</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Marketing</td>
                        <td className="px-4 py-2">Track conversions (if applicable)</td>
                        <td className="px-4 py-2">Ad tracking pixels</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Your Choices</h2>
                <p>You can control cookies through your browser settings:</p>
                <ul className="space-y-2">
                  <li>Disable Cookies: Most browsers allow you to refuse all cookies.</li>
                  <li>Delete Cookies: You can delete existing cookies at any time.</li>
                </ul>
                <p>Note: Disabling cookies may limit your site experience.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
                <p>
                  For questions about our Cookie Policy, email hello@comfortzone.com.
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
