import { PolicyPage } from "@/components/policy-page";

export default function DisputeResolutionChargebackPolicyPage() {
  return (
    <PolicyPage
      title="Dispute Resolution and Chargeback Policy"
      effectiveDate="May 15, 2026"
      intro="This policy explains how Comfort Giggles handles order questions, payment disputes, and chargeback-related requests."
      sections={[
        {
          title: "1. Contact Us First",
          body: [
            "If there is a problem with an order, please contact Comfort Giggles as soon as possible. We can often resolve shipping issues, damaged items, incorrect products, duplicate charges, or refund questions faster through direct support.",
          ],
        },
        {
          title: "2. Order Review",
          body: [
            "When reviewing a dispute, we may use order confirmations, payment records, shipping and tracking details, customer communications, product photos, and return records.",
          ],
        },
        {
          title: "3. Available Resolutions",
          bullets: [
            "Replacement, refund, partial refund, cancellation, store credit, or return authorization when appropriate.",
            "Carrier follow-up for delayed or lost shipments.",
            "Correction of billing, shipping, or product errors caused by Comfort Giggles or a fulfillment partner.",
          ],
        },
        {
          title: "4. Chargebacks",
          body: [
            "Customers may contact their bank or card issuer according to the rules of their payment provider. If a chargeback is opened, Comfort Giggles may respond with relevant order, shipping, delivery, communication, and refund records.",
          ],
        },
        {
          title: "5. Contact Information",
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
