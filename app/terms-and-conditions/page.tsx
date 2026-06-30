import { PolicyPage } from "@/components/policy-page";

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title='Terms and Conditions'
      effectiveDate='May 15, 2026'
      intro='Welcome to Comfort Giggles. By accessing our website or placing an order, you agree to these Terms and Conditions.'
      sections={[
        {
          title: '1. Use of Website',
          body: [
            'You agree to use this website only for lawful purposes and in accordance with these Terms and Conditions. You may not use the website in any way that could damage, disable, or impair our services.',
          ],
        },
        {
          title: '2. Products and Services',
          body: [
            'Comfort Giggles sells candle products and related goods through our website. Products may be manufactured, packaged, stored, or shipped by trusted third-party suppliers and fulfillment partners. Comfort Giggles remains the customer-facing retailer for website orders.',
            'We strive to ensure that product descriptions, images, scent notes, sizing, packaging, availability, and pricing are accurate. However, small variations may occur, and we reserve the right to correct errors or omissions.',
          ],
        },
        {
          title: '3. Orders',
          body: [
            'All orders are subject to acceptance and availability. We reserve the right to cancel or refuse any order for any reason, including suspected fraud or pricing errors.',
          ],
        },
        {
          title: '4. Payments',
          body: [
            'Payments must be made through the payment methods provided at checkout. Orders will not be processed until payment has been successfully received or authorized. We do not store full credit or debit card numbers on our servers.',
          ],
        },
        {
          title: '5. Intellectual Property',
          body: [
            'All content on this website, including logos, text, graphics, images, and designs, is the property of Comfort Giggles and may not be copied, reproduced, or distributed without written permission.',
          ],
        },
        {
          title: '6. Limitation of Liability',
          body: [
            'Comfort Giggles shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website or products.',
          ],
        },
        {
          title: '7. Third-Party Links',
          body: [
            'Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of any third-party sites.',
          ],
        },
        {
          title: '8. Shipping, Returns, and Cancellations',
          body: [
            'Shipping, returns, refunds, and cancellations are governed by our Shipping Policy, Refund Policy, and Cancellation Policy.',
          ],
        },
        {
          title: '9. Privacy',
          body: [
            'Your use of this website is also governed by our Privacy Policy.',
          ],
        },
        {
          title: '10. Changes to Terms',
          body: [
            'We reserve the right to update or modify these Terms and Conditions at any time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.',
          ],
        },
        {
          title: '11. Contact Information',
          bullets: [
            'Comfort Giggles',
            'Email: hello@comfortgiggles.com',
            'Phone: 1-202-800-7298',
            'Address: 8 The Green Suite B, Dover, DE 19901',
            'Contact Form: /contact',
          ],
        },
      ]}
    />
  );
}
