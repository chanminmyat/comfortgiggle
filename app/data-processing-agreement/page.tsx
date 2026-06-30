import { PolicyPage } from "@/components/policy-page";

export default function DataProcessingAgreementPage() {
  return (
    <PolicyPage
      title="Data Processing Statement"
      effectiveDate="May 15, 2026"
      intro="This statement summarizes how Comfort Giggles processes customer and order data for store operations."
      sections={[
        {
          title: "1. Data We Process",
          bullets: [
            "Customer contact details such as name, email, phone number, billing address, and shipping address.",
            "Order details such as product selections, quantities, order value, payment status, and shipping status.",
            "Support communications and return, refund, cancellation, or dispute records.",
            "Website and device data used for security, analytics, and cart functionality.",
          ],
        },
        {
          title: "2. Processing Purposes",
          bullets: [
            "Order processing, payment confirmation, fraud prevention, shipping, returns, refunds, and customer support.",
            "Sharing necessary order information with payment, hosting, email, supplier, manufacturing, and fulfillment partners.",
            "Maintaining records for tax, accounting, regulatory, and card-network compliance.",
          ],
        },
        {
          title: "3. Customer Requests",
          body: [
            "Customers may contact us to request access, correction, or deletion of personal information, subject to records we must retain for legal, accounting, fraud-prevention, or transaction-support purposes.",
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
