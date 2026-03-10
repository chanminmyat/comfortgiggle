import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-gray-300'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          <div>
            <h3 className='text-xl font-bold text-white mb-4'>Comfort Giggle</h3>
            <p className='text-sm mb-4'>
              Small-batch candles crafted to bring warmth, calm, and cozy
              atmosphere to every room.
            </p>
            <div className='hidden'></div>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Shop Candles</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/products'
                  className='hover:text-amber-400 transition-colors'
                >
                  All Candles
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=scented-candles'
                  className='hover:text-amber-400 transition-colors'
                >
                  Scented Candles
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=wax-melts'
                  className='hover:text-amber-400 transition-colors'
                >
                  Wax Melts
                </Link>
              </li>
              <li>
                <Link
                  href='/products?category=gift-sets'
                  className='hover:text-amber-400 transition-colors'
                >
                  Gift Sets
                </Link>
              </li>
              <li>
                <Link
                  href='/products?featured=true'
                  className='hover:text-amber-400 transition-colors'
                >
                  Featured Candles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Company</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  href='/about'
                  className='hover:text-amber-400 transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='hover:text-amber-400 transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/accessibility-statement'
                  className='hover:text-amber-400 transition-colors'
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link
                  href='/anti-discrimination-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Anti-Discrimination Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/anti-fraud-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Anti-Fraud Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/clear-pricing-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Clear Pricing Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/cookie-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/data-processing-agreement'
                  className='hover:text-amber-400 transition-colors'
                >
                  Data Processing Agreement
                </Link>
              </li>
              <li>
                <Link
                  href='/dispute-resolution-chargeback-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Dispute Resolution & Chargeback Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/freelancer-third-party-provider-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Freelancer & Third-Party Provider Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/record-retention-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Record Retention Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/refund-return-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/security-information-security-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Security & Information Security Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/shipping-policy'
                  className='hover:text-amber-400 transition-colors'
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms-of-service'
                  className='hover:text-amber-400 transition-colors'
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Contact Us</h4>
            <ul className='space-y-3 text-sm'>
              <li className='flex items-start space-x-3'>
                <MapPin className='h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5' />
                <span>
                  8 The Green Suite B<br />
                  Dover, DE 19901
                </span>
              </li>
              <li className='flex items-center space-x-3'>
                <Phone className='h-5 w-5 text-amber-400 flex-shrink-0' />
                <a
                  href='tel:+12028007298'
                  className='hover:text-amber-400 transition-colors'
                >
                  1-202-800-7298
                </a>
              </li>
              <li className='flex items-center space-x-3'>
                <Mail className='h-5 w-5 text-amber-400 flex-shrink-0' />
                <a
                  href='mailto:hello@comfortgiggle.com'
                  className='hover:text-amber-400 transition-colors'
                >
                  hello@comfortgiggle.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-8 text-center text-sm'>
          <p>© {currentYear} Comfort Giggle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
