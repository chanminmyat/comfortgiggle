import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function TermsAndConditionsPage() {
  return (
    <PolicyPage
      title={"Terms & Conditions"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Operated by Comfort Giggles LLC (8 The Green, Suite B, Dover, DE 19901). Billing Descriptor: COMFORT GIGGLES. Accepted Payments: Visa, Mastercard, American Express, Discover, ACH / Bank Transfer, Zelle, and Wise. Governed by the laws of the State of Delaware. Includes mandatory Mobile SMS Terms & Conditions for 1-888-554-4521."}
      sections={[
        {
          title: "1. Agreement to Terms",
          body: [
            "Welcome to www.comfortgiggles.com, operated by Comfort Giggles LLC (\"Comfort Giggles,\" \"we,\" \"us,\" or \"our\"). By accessing our website, purchasing curated 100% soy wax candles, home fragrance products, or gift sets, or completing a payment via checkout or an SMS payment link, you agree to be bound by these Terms & Conditions and all policies referenced herein.",
          ],
        },
        {
          title: "2. Products, Candle Care & Accuracy",
          body: [
            "We offer curated 100% soy wax candles, sourced through our manufacturing and fulfillment partners, along with custom-scented collections, and home fragrance accessories. Because soy wax is a natural material, slight variations in wax texture, frosting, or fragrance color may occur and do not affect burn performance. Customers agree to follow all standard candle safety and wick-trimming instructions provided on product labels.",
          ],
        },
        {
          title: "3. Accepted Payment Methods & Billing Descriptor",
          body: [
            "We accept the following payment methods at checkout and via secure payment links: Visa, Mastercard, American Express, Discover, ACH / Bank Transfer, Zelle, and Wise.",
            "Credit Card & Bank Statement Descriptor: All card and electronic payments processed through www.comfortgiggles.com will appear on your credit card or bank statement under the merchant descriptor \"COMFORT GIGGLES\".",
            "By submitting payment information, you represent and warrant that you are authorized to use the designated payment method and authorize us (or our PCI-compliant payment processors) to charge the full order amount, including applicable taxes and shipping charges.",
          ],
        },
        {
          title: "4. Mobile Messaging (SMS) Terms & Conditions",
          body: [
            "By checking the SMS consent box at checkout or during an invoice/order request on www.comfortgiggles.com, you consent to receive transactional text messages from Comfort Giggles via toll-free number 1-888-554-4521. Messages include secure payment links, invoice notifications, payment receipts, order confirmation and shipping alerts, and direct customer support responses.",
          ],
          bullets: [
            "Message Frequency & Carrier Rates: Message frequency varies based on your order and payment activity. Message and data rates may apply depending on your wireless plan.",
            "Opt-Out Instructions (STOP): You may opt out at any time by replying STOP to any message from 1-888-554-4521. You will receive one final confirmation text and no further SMS messages unless you opt in again.",
            "Support Instructions (HELP): Reply HELP to any message for assistance, email support@comfortgiggles.com, or call 1-888-554-4521 (Monday – Saturday, 9:00 AM – 6:00 PM Eastern Time (ET) (Phone & Email); Sunday: Email Support Only).",
            "Carrier Liability: Wireless carriers (including AT&T, T-Mobile, Verizon, and others) are not liable for delayed or undelivered messages.",
          ],
        },
        {
          title: "5. Intellectual Property",
          body: [
            "All content on www.comfortgiggles.com—including product names, scent descriptions, label designs, photography, logos, text, and graphics—is the exclusive property of Comfort Giggles LLC or its licensors and is protected by United States and international copyright and trademark laws.",
          ],
        },
        {
          title: "6. Limitation of Liability",
          body: [
            "To the maximum extent permitted by applicable law, Comfort Giggles LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of www.comfortgiggles.com or improper/unattended candle use. Our total aggregate liability shall not exceed the purchase price paid by you for the specific product giving rise to the claim.",
          ],
        },
        {
          title: "7. Governing Law & Venue",
          body: [
            "These Terms & Conditions and any separate agreements whereby we provide you products shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles. Any legal action or proceeding shall be brought exclusively in the state or federal courts located in Delaware.",
          ],
        },
      ]}
    />
  );
}
