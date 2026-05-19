import { PolicyPage } from "@/components/policy-page";
import { businessInfo } from "@/lib/business-info";

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title='Terms and Conditions'
      effectiveDate='May 15, 2026'
      intro={`Welcome to ${businessInfo.name}. By accessing or using ${businessInfo.websiteUrl}, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.`}
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
            'We strive to ensure that all product descriptions, images, and pricing are accurate. However, we reserve the right to correct any errors, inaccuracies, or omissions at any time without prior notice.',
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
            'Payments must be made through the payment methods provided on our website. Orders will not be processed until payment has been successfully received.',
          ],
        },
        {
          title: '5. Intellectual Property',
          body: [
            `All content on this website, including logos, text, graphics, images, and designs, is the property of ${businessInfo.name} and may not be copied, reproduced, or distributed without written permission.`,
          ],
        },
        {
          title: '6. Limitation of Liability',
          body: [
            `${businessInfo.name} shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website or products.`,
          ],
        },
        {
          title: '7. Third-Party Links',
          body: [
            'Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of any third-party sites.',
          ],
        },
        {
          title: '8. Privacy',
          body: [
            'Your use of this website is also governed by our Privacy Policy.',
          ],
        },
        {
          title: '9. Changes to Terms',
          body: [
            'We reserve the right to update or modify these Terms and Conditions at any time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.',
          ],
        },
        {
          title: '10. Contact Information',
          bullets: [
            businessInfo.name,
            `Email: ${businessInfo.email}`,
            `Phone: ${businessInfo.phoneDisplay}`,
            `Website: ${businessInfo.websiteUrl}`,
          ],
        },
      ]}
    />
  );
}
