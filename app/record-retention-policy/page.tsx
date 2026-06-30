import { PolicyPage } from "@/components/policy-page";

export default function RecordRetentionPolicyPage() {
  return (
    <PolicyPage
      title="Record Retention Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles keeps business records only as long as needed for operations, support, accounting, fraud prevention, and legal compliance."
      sections={[
        {
          title: "1. Order and Transaction Records",
          body: [
            "Order records, payment confirmation records, invoices, refunds, cancellations, and related accounting records may be retained for at least 7 years or as otherwise required for tax, accounting, payment, or legal purposes.",
          ],
        },
        {
          title: "2. Customer Support Records",
          body: [
            "Customer support messages, return requests, damaged-item claims, shipment questions, and dispute records may be retained as needed to resolve the issue and support future order history.",
          ],
        },
        {
          title: "3. Website and Security Logs",
          body: [
            "Website, device, fraud-prevention, and security logs may be retained for a limited period based on operational, security, and compliance needs.",
          ],
        },
        {
          title: "4. Deletion Requests",
          body: [
            "Customers may request deletion of personal information, but some records may need to be retained for completed transactions, legal obligations, fraud prevention, accounting, or dispute handling.",
          ],
        },
        {
          title: "5. Contact Information",
          bullets: [
            "Comfort Giggles",
            "Email: hello@comfortgiggles.com",
            "Phone: 1-202-800-7298",
            "Address: 8 The Green Suite B, Dover, DE 19901",
            "Contact Form: /contact",
          ],
        },
      ]}
    />
  );
}
