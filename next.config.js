const isDevelopment = process.env.NODE_ENV === 'development';
const portalUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || process.env.BACKEND_PORTAL_BASE_URL || process.env.PORTAL_BASE_URL || '';
const portalOrigin = (() => {
  try {
    return portalUrl ? new URL(portalUrl).origin : '';
  } catch {
    return '';
  }
})();
const cleanCspSource = (value) => value.replace(/'/g, '');
const portalCspSource = portalOrigin ? ` ${cleanCspSource(portalOrigin)}` : '';
const authorizeNetCspSources =
  ' https://js.authorize.net https://jstest.authorize.net https://api.authorize.net https://apitest.authorize.net';
const squareCspSources = ' https://connect.squareup.com https://connect.squareupsandbox.com';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}${portalCspSource}${authorizeNetCspSources}`,
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' data: blob:${portalCspSource}`,
              "font-src 'self' data:",
              `connect-src 'self' https://api.stripe.com${portalCspSource}${authorizeNetCspSources}${squareCspSources}`,
              `frame-src 'self'${portalCspSource}${authorizeNetCspSources}`,
              `child-src 'self'${portalCspSource}${authorizeNetCspSources}`,
              "form-action 'self'",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "object-src 'none'",
              ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
            ].join('; '),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
