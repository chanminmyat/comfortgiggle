import { PolicyPage } from "@/components/policy-page";

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      title="Cookie Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles uses cookies and similar technologies to operate our store, remember cart activity, and improve the shopping experience."
      sections={[
        {
          title: "1. Types of Cookies",
          bullets: [
            "Necessary cookies: support cart, checkout, security, and core website functions.",
            "Preference cookies: remember settings or choices where applicable.",
            "Analytics cookies: help us understand website usage and performance.",
            "Marketing cookies: may help measure or improve promotional campaigns where enabled.",
          ],
        },
        {
          title: "2. Managing Cookies",
          body: [
            "Most browsers allow you to block or delete cookies. Some website features, including cart or checkout features, may not work properly if necessary cookies are disabled.",
          ],
        },
        {
          title: "3. Third-Party Tools",
          body: [
            "Some cookies or similar technologies may be set by service providers that support hosting, analytics, payments, security, or marketing.",
          ],
        },
        {
          title: "4. Contact Information",
          bullets: [
            "Comfort Giggles",
            "Email: hello@comfortgiggle.com",
            "Phone: 1-202-800-7298",
            "Address: 8 The Green Suite B, Dover, DE 19901",
            "Contact Form: /contact",
          ],
        },
      ]}
    />
  );
}
