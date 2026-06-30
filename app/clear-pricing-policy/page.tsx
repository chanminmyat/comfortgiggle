import { PolicyPage } from "@/components/policy-page";

export default function ClearPricingPolicyPage() {
  return (
    <PolicyPage
      title="Clear Pricing Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles is committed to showing customers the price of products, shipping, and the final order total before checkout is completed."
      sections={[
        {
          title: "1. Product Pricing",
          body: [
            "Product prices are displayed in USD on product pages, cart, and checkout. Prices may vary by size, scent, jar style, customization, promotion, or availability.",
          ],
        },
        {
          title: "2. Shipping Charges",
          body: [
            "Shipping is shown in the cart and checkout before payment. Orders of $50 or more qualify for free standard shipping. Orders below that threshold currently show a $30 shipping charge.",
          ],
        },
        {
          title: "3. Taxes and Fees",
          body: [
            "Any applicable taxes, processing charges, or payment-related fees will be shown before the customer completes checkout when they apply.",
          ],
        },
        {
          title: "4. No Hidden Charges",
          body: [
            "Comfort Giggles does not intentionally add undisclosed charges after checkout. If an error occurs, we will contact the customer before making any material change to an order total.",
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
