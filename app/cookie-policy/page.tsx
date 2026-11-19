import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function CookiePolicyPage() {
  return (
    <PolicyPage
      title={"Cookie Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Explains strictly necessary cart/checkout cookies, analytics, and browser controls on www.comfortgiggles.com."}
      sections={[
        {
          title: "1. What Are Cookies?",
          body: [
            "Cookies and similar browser storage technologies are small text files placed on your device when you browse www.comfortgiggles.com. They keep items in your shopping cart, secure your checkout and payment link sessions, and help us improve storefront performance.",
          ],
        },
        {
          title: "2. Categories of Cookies We Use",
          bullets: [
            "Strictly Necessary & Checkout Cookies: Required for shopping cart persistence, checkout authentication, encrypted payment sessions, and fraud screening.",
            "Functional & Preference Cookies: Remember your scent filters, recently viewed candles, and dismissed popups.",
            "Performance & Analytics Cookies: Measure site speed, page views, and checkout completion rates in aggregated form.",
          ],
        },
        {
          title: "3. Managing Your Cookie Settings",
          body: [
            "You can block or clear cookies anytime through your browser settings. Please note that disabling strictly necessary cookies may prevent the shopping cart or secure payment links on www.comfortgiggles.com from functioning properly.",
          ],
        },
      ]}
    />
  );
}
