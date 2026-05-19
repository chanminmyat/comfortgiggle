import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { businessInfo } from "@/lib/business-info";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/accessibility-statement", label: "Accessibility Statement" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

const policyLinks = [
  { href: "/anti-discrimination-policy", label: "Anti-Discrimination Policy" },
  { href: "/anti-fraud-policy", label: "Anti-Fraud Policy" },
  { href: "/clear-pricing-policy", label: "Clear Pricing Policy" },
  { href: "/data-processing-agreement", label: "Data Processing Agreement" },
  {
    href: "/dispute-resolution-chargeback-policy",
    label: "Dispute Resolution & Chargeback Policy",
  },
  {
    href: "/freelancer-third-party-provider-policy",
    label: "Freelancer & Third-Party Provider Policy",
  },
  { href: "/record-retention-policy", label: "Record Retention Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  {
    href: "/security-information-security-policy",
    label: "Security & Information Security Policy",
  },
  { href: "/shipping-policy", label: "Shipping Policy" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='container mx-auto px-4 py-14'>
        <div className='grid gap-10 border-b border-gray-800 pb-10 lg:grid-cols-[1.1fr_0.9fr_1.4fr_1fr]'>
          <div className='max-w-sm'>
            <h3 className='text-2xl font-bold text-white'>{businessInfo.name}</h3>
            <p className='mt-5 text-sm leading-7 text-gray-400'>
              Small-batch candles crafted to bring warmth, calm, and cozy
              atmosphere to every room.
            </p>
          </div>

          <div>
            <h4 className='text-sm font-semibold uppercase tracking-[0.18em] text-white/90'>
              Shop Candles
            </h4>
            <ul className='mt-5 space-y-3 text-sm'>
              <li>
                <Link
                  href='/products'
                  className='text-gray-300 transition-colors hover:text-amber-400'
                >
                  All Candles
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=scented-candles'
                  className='text-gray-300 transition-colors hover:text-amber-400'
                >
                  Scented Candles
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=wax-melts'
                  className='text-gray-300 transition-colors hover:text-amber-400'
                >
                  Wax Melts
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=gift-sets'
                  className='text-gray-300 transition-colors hover:text-amber-400'
                >
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link
                  href='/products?featured=true'
                  className='text-gray-300 transition-colors hover:text-amber-400'
                >
                  Featured Candles
                </Link>
              </li>
            </ul>
          </div>

          <div className='grid gap-8 sm:grid-cols-2'>
            <div>
              <h4 className='text-sm font-semibold uppercase tracking-[0.18em] text-white/90'>
                Company
              </h4>
              <ul className='mt-5 space-y-3 text-sm'>
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-gray-300 transition-colors hover:text-amber-400'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className='text-sm font-semibold uppercase tracking-[0.18em] text-white/90'>
                Policies
              </h4>
              <ul className='mt-5 space-y-3 text-sm'>
                {policyLinks.map((link) => (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      className='text-gray-300 transition-colors hover:text-amber-400'
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className='text-sm font-semibold uppercase tracking-[0.18em] text-white/90'>
              Contact Us
            </h4>
            <ul className='mt-5 space-y-5 text-sm text-gray-300'>
              <li className='flex items-start gap-3'>
                <div className='mt-0.5 rounded-full bg-amber-500/10 p-2 text-amber-400'>
                  <MapPin className='h-4 w-4' />
                </div>
                <span className='leading-6 text-gray-300'>
                  {businessInfo.addressLine1}
                  <br />
                  {businessInfo.addressLine2}
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <div className='rounded-full bg-amber-500/10 p-2 text-amber-400'>
                  <Phone className='h-4 w-4' />
                </div>
                <a
                  href={`tel:${businessInfo.phoneHref}`}
                  className='transition-colors hover:text-amber-400'
                >
                  {businessInfo.phoneDisplay}
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <div className='rounded-full bg-amber-500/10 p-2 text-amber-400'>
                  <Mail className='h-4 w-4' />
                </div>
                <a
                  href={`mailto:${businessInfo.email}`}
                  className='break-all transition-colors hover:text-amber-400'
                >
                  {businessInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col gap-3 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between'>
          <p>© {currentYear} {businessInfo.name}. All rights reserved.</p>
          <p className='text-gray-500'>Made for a calmer, warmer home.</p>
        </div>
      </div>
    </footer>
  );
}
