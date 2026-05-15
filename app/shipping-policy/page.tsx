import { PolicyPage } from "@/components/policy-page";

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title='Shipping Policy'
      effectiveDate='May 15, 2026'
      intro='Thank you for shopping with Classic Comfort Clothing. Below are our shipping terms and conditions.'
      sections={[
        {
          title: '1. Order Processing',
          body: [
            'Orders are typically processed within 3-5 business days after payment confirmation. Custom orders may require additional processing time.',
          ],
        },
        {
          title: '2. Shipping Methods',
          body: [
            'We use reliable shipping carriers to deliver orders within the United States. Shipping options and estimated delivery times are displayed during checkout.',
          ],
        },
        {
          title: '3. Shipping Times',
          body: [
            'Please note that delivery times are estimates and may vary due to weather, holidays, or carrier delays.',
          ],
          bullets: [
            'Standard Shipping: 3-7 business days',
            'Expedited Shipping: 1-3 business days',
          ],
        },
        {
          title: '4. Shipping Fees',
          body: [
            'Shipping costs are calculated during checkout based on the delivery location and selected shipping method.',
          ],
        },
        {
          title: '5. Tracking Information',
          body: [
            'Once your order has shipped, you will receive a confirmation email with tracking information.',
          ],
        },
        {
          title: '6. Lost or Delayed Shipments',
          body: [
            'We are not responsible for delays caused by shipping carriers. However, we will assist customers in resolving shipping issues whenever possible.',
          ],
        },
        {
          title: '7. Incorrect Shipping Address',
          body: [
            'Customers are responsible for providing accurate shipping information. We are not responsible for orders shipped to incorrect addresses provided by the customer.',
          ],
        },
        {
          title: '8. Contact Information',
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
