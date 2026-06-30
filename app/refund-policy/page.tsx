import { PolicyPage } from "@/components/policy-page";

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title='Refund Policy'
      effectiveDate='May 15, 2026'
      intro='At Comfort Giggles, customer satisfaction is important to us. This policy explains return eligibility, refund timing, and how to contact us about an order.'
      sections={[
        {
          title: '1. Returns',
          body: [
            'Customers may request a return within 14 days of receiving their order. To be eligible for a return:',
          ],
          bullets: [
            'Items must be unused, unburned, undamaged, and in original condition.',
            'Items must include original packaging and any included inserts or accessories.',
            'Proof of purchase is required.',
          ],
        },
        {
          title: '2. Non-Returnable Items',
          bullets: [
            'Custom, personalized, or made-to-order products once production has started',
            'Final sale or clearance items',
            'Gift cards',
          ],
        },
        {
          title: '3. Refunds',
          body: [
            'Once we receive and inspect your returned item, or approve a damaged-item claim, we will notify you regarding the approval or rejection of your refund.',
            'Approved refunds will be processed to the original payment method within 5-10 business days.',
          ],
        },
        {
          title: '4. Exchanges',
          body: [
            'We only replace items if they are defective, damaged, or incorrect.',
          ],
        },
        {
          title: '5. Return Shipping',
          body: [
            'Customers are responsible for return shipping costs unless the item arrived damaged or incorrect.',
          ],
        },
        {
          title: '6. Damaged or Incorrect Items',
          body: [
            'If you receive a damaged, defective, or incorrect item, please contact us within 7 days of delivery with photos of the product, packaging, and order details.',
          ],
        },
        {
          title: '7. Contact Information',
          bullets: [
            'Comfort Giggles',
            'Email: hello@comfortgiggle.com',
            'Phone: 1-202-800-7298',
            'Address: 8 The Green Suite B, Dover, DE 19901',
            'Contact Form: /contact',
          ],
        },
      ]}
    />
  );
}
