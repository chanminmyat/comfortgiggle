import { PolicyPage } from "@/components/policy-page";

export default function ThirdPartyProviderPolicyPage() {
  return (
    <PolicyPage
      title="Third-Party Supplier and Fulfillment Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles works with third-party candle manufacturers, suppliers, and fulfillment providers to produce or ship selected products."
      sections={[
        {
          title: "1. Retailer Responsibility",
          body: [
            "Comfort Giggles is the customer-facing retailer for orders placed through our website. Customers should contact Comfort Giggles for order support, returns, refunds, damaged items, and shipping questions.",
          ],
        },
        {
          title: "2. Supplier Partners",
          body: [
            "Products may be manufactured, packaged, stored, or shipped by trusted supplier partners. We select partners based on product quality, reliability, and ability to support the customer experience.",
          ],
        },
        {
          title: "3. Information Shared With Partners",
          body: [
            "We may share order details, shipping information, and product specifications with suppliers and fulfillment providers only as needed to complete an order or resolve a customer service issue.",
          ],
        },
        {
          title: "4. Customer Support",
          body: [
            "Customers do not need to contact manufacturers directly. Comfort Giggles remains the support contact for website purchases and will coordinate with partners when needed.",
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
