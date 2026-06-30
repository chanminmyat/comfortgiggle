import { PolicyPage } from "@/components/policy-page";

export default function AntiFraudPolicyPage() {
  return (
    <PolicyPage
      title="Anti-Fraud Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles uses fraud-prevention measures to protect customers, payment accounts, and the integrity of our store."
      sections={[
        {
          title: "1. Order Screening",
          body: [
            "Orders may be reviewed for unusual payment activity, mismatched billing or shipping details, unusually high quantities, repeated failed payments, or other signs of unauthorized activity.",
          ],
        },
        {
          title: "2. Verification",
          body: [
            "We may contact a customer by email or phone to verify order details before shipping. If we cannot verify an order, we may delay, cancel, or refund it.",
          ],
        },
        {
          title: "3. Suspicious Activity",
          bullets: [
            "Use of stolen payment information is prohibited.",
            "False chargeback claims, reshipping abuse, or return fraud may result in cancellation or refusal of future orders.",
            "We may share relevant records with payment processors, card networks, shipping carriers, or law enforcement when appropriate.",
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
