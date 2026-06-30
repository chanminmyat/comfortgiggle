import { PolicyPage } from "@/components/policy-page";

export default function RefundReturnPolicyPage() {
  return (
    <PolicyPage
      title="Returns and Exchanges Policy"
      effectiveDate="May 15, 2026"
      intro="This policy explains return eligibility, exchanges, refund timing, and how to contact Comfort Giggles about an order."
      sections={[
        {
          title: "1. Return Window",
          body: [
            "Customers may request a return within 14 days of receiving an order. Items must be unused, unburned, undamaged, and in original packaging.",
          ],
        },
        {
          title: "2. Non-Returnable Items",
          bullets: [
            "Custom, personalized, or made-to-order products once production has started.",
            "Final sale, clearance, promotional, or gift-card items.",
            "Items that have been burned, used, damaged after delivery, or returned without original packaging.",
          ],
        },
        {
          title: "3. Damaged or Incorrect Items",
          body: [
            "If an item arrives damaged or incorrect, contact us within 7 days of delivery with your order details and photos of the product and packaging.",
          ],
        },
        {
          title: "4. Refund Timing",
          body: [
            "Approved refunds are processed to the original payment method within 5-10 business days after we receive and inspect the returned item or approve a damage claim.",
          ],
        },
        {
          title: "5. Return Shipping",
          body: [
            "Customers are responsible for return shipping costs unless the item arrived damaged, defective, or incorrect. Original shipping charges are non-refundable unless required by law or caused by our error.",
          ],
        },
        {
          title: "6. Exchanges",
          body: [
            "We do not offer automatic exchanges for all products. If you received a damaged, defective, or incorrect item, contact us within 7 days of delivery so we can review a replacement, return, or refund option.",
          ],
        },
        {
          title: "7. Contact Information",
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
