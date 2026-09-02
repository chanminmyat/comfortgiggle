import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Comfort Giggles - Curated Candles for Cozy Spaces',
  description: 'Shop scented candles, wax melts, and gift sets from Comfort Giggles. Curated collections made with trusted supplier partners to bring warmth and calm to your home.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/giggles/logo.jpeg', type: 'image/jpeg' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Comfort Giggles - Curated Candles for Cozy Spaces',
    description: 'Shop scented candles, wax melts, and gift sets from Comfort Giggles.',
    url: '/',
    siteName: 'Comfort Giggles',
    type: 'website',
    images: [
      {
        url: '/giggles/hero_section.png',
        width: 1200,
        height: 630,
        alt: 'Comfort Giggles candle collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comfort Giggles - Curated Candles for Cozy Spaces',
    description: 'Shop scented candles, wax melts, and gift sets from Comfort Giggles.',
    images: [
      {
        url: '/giggles/hero_section.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
