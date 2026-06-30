import { PolicyPage } from "@/components/policy-page";

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title='Shipping Policy'
      effectiveDate='May 15, 2026'
      intro='Thank you for shopping with Comfort Giggles. This policy explains order processing, shipping fees, and delivery expectations.'
      sections={[
        {
          title: '1. Order Processing',
          body: [
            'Orders are typically processed within 3-5 business days after payment confirmation. Because some products may be produced or fulfilled by third-party candle manufacturers or fulfillment partners, custom or made-to-order items may require additional processing time.',
          ],
        },
        {
          title: '2. Shipping Methods',
          body: [
            'We use reliable shipping carriers and fulfillment partners to deliver orders within the United States. Estimated delivery times are displayed when available and may vary by destination, carrier, and fulfillment partner.',
          ],
        },
        {
          title: '3. Shipping Times',
          body: [
            'Please note that delivery times are estimates and may vary due to weather, holidays, or carrier delays.',
          ],
          bullets: [
            'Standard Shipping: usually 3-7 business days after processing',
            'Custom or supplier-fulfilled items: may require additional processing time before shipment',
          ],
        },
        {
          title: '4. Shipping Fees',
          body: [
            'Shipping costs are shown in the cart and checkout before payment. Orders of $50 or more qualify for free standard shipping. Orders below that threshold currently show a $30 shipping charge.',
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
