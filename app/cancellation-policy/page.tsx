import { PolicyPage } from "@/components/policy-page";

export default function CancellationPolicyPage() {
  return (
    <PolicyPage
      title='Cancellation Policy'
      effectiveDate='May 15, 2026'
      intro='At Classic Comfort Clothing, we understand that customers may need to cancel an order. Please review our cancellation policy below.'
      sections={[
        {
          title: '1. Order Cancellation',
          body: [
            'Customers may request to cancel an order within 24 hours of placing the order, provided the order has not yet been processed or shipped.',
          ],
        },
        {
          title: '2. How to Request a Cancellation',
          body: [
            'To request an order cancellation, please contact our customer support team as soon as possible with your order number and contact information.',
          ],
        },
        {
          title: '3. Orders Already Shipped',
          body: [
            'Once an order has been shipped, it can no longer be canceled. Customers may instead follow our Refund Policy and Return Policy procedures.',
          ],
        },
        {
          title: '4. Custom or Personalized Orders',
          body: [
            'Custom-made, personalized, or special-order items cannot be canceled once production has started.',
          ],
        },
        {
          title: '5. Refund for Canceled Orders',
          body: [
            'Approved cancellations will be refunded to the original payment method within 5-10 business days.',
          ],
        },
        {
          title: '6. Fraud Prevention',
          body: [
            'We reserve the right to refuse or cancel any order suspected of fraud, unauthorized activity, or violation of our Terms and Conditions.',
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
