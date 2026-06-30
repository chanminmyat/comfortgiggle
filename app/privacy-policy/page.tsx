import { PolicyPage } from "@/components/policy-page";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles respects your privacy. This policy explains what information we collect, how we use it, and how we share it when you shop with us."
      sections={[
        {
          title: "1. Information We Collect",
          body: [
            "We collect information you provide when placing an order, contacting support, joining our newsletter, or using our website.",
          ],
          bullets: [
            "Contact information: name, email address, phone number, and shipping address.",
            "Order information: products purchased, order value, shipping method, and order status.",
            "Payment information: payment confirmation details from our payment processor. We do not store full credit or debit card numbers.",
            "Website information: browser type, device information, pages viewed, cart activity, and cookies or similar technologies.",
          ],
        },
        {
          title: "2. How We Use Information",
          bullets: [
            "To process orders, payments, shipping, returns, refunds, and customer support requests.",
            "To share the minimum required order and shipping details with manufacturing, supplier, and fulfillment partners.",
            "To prevent fraud, protect the website, and comply with tax, accounting, legal, and card-network obligations.",
            "To send order updates, service messages, and optional marketing communications where permitted.",
          ],
        },
        {
          title: "3. Third-Party Partners",
          body: [
            "Comfort Giggles works with trusted service providers, including payment processors, website hosting providers, analytics providers, email tools, candle manufacturers, suppliers, and shipping or fulfillment partners.",
            "These partners receive only the information needed to perform their services for Comfort Giggles and are not permitted to use customer information for unrelated purposes.",
          ],
        },
        {
          title: "4. Cookies",
          body: [
            "We use cookies and similar technologies to support cart functionality, understand site performance, remember preferences, and improve the shopping experience. You can manage cookies through your browser settings.",
          ],
        },
        {
          title: "5. Data Security",
          body: [
            "We use reasonable administrative, technical, and organizational safeguards to protect customer information. Payment details are handled through our payment processor, and Comfort Giggles does not store full card numbers.",
          ],
        },
        {
          title: "6. Data Retention",
          body: [
            "We retain order, transaction, and support records for as long as needed for customer service, accounting, tax, fraud-prevention, and legal compliance.",
          ],
        },
        {
          title: "7. Your Choices",
          bullets: [
            "You may contact us to request access, correction, or deletion of personal information, subject to records we must keep for legal or business purposes.",
            "You may unsubscribe from marketing emails using the link in those emails or by contacting us.",
          ],
        },
        {
          title: "8. Contact Information",
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
