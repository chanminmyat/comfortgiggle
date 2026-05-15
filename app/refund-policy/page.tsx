import { PolicyPage } from "@/components/policy-page";

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title='Refund Policy'
      effectiveDate='May 15, 2026'
      intro='At Classic Comfort Clothing, customer satisfaction is important to us. Please review our refund and return policy below.'
      sections={[
        {
          title: '1. Returns',
          body: [
            'Customers may request a return within 14 days of receiving their order. To be eligible for a return:',
          ],
          bullets: [
            'Items must be unused, unworn, and in original condition.',
            'Items must include original tags and packaging.',
            'Proof of purchase is required.',
          ],
        },
        {
          title: '2. Non-Returnable Items',
          bullets: [
            'Customized or personalized products',
            'Final sale or clearance items',
            'Gift cards',
          ],
        },
        {
          title: '3. Refunds',
          body: [
            'Once we receive and inspect your returned item, we will notify you regarding the approval or rejection of your refund.',
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
            'If you receive a damaged or incorrect item, please contact us within 7 days of delivery with photos and order details.',
          ],
        },
        {
          title: '7. Contact Information',
          bullets: [
            'Classic Comfort Clothing',
            'Email: classiccomfortclothing@outlook.com',
            'Phone: 817-381-6702',
            'Website: https://classiccomfortusa.com',
          ],
        },
      ]}
    />
  );
}
