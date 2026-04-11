import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ═══════════════════════════════════════════
  // IMAGES
  // ═══════════════════════════════════════════
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },

  // ═══════════════════════════════════════════
  // SECURITY HEADERS
  // ═══════════════════════════════════════════
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevent MIME-type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Force HTTPS for 2 years (HSTS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Control referrer info
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Legacy XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Disable browser features we don't need
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // DNS prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https://cdn.shopify.com https://689rigs.com https://*.vercel.app https://flagcdn.com",
              "connect-src 'self' https://689-accessories.myshopify.com https://*.shopify.com https://open.er-api.com https://ipapi.co https://*.vercel.app https://vercel.live wss://*.vercel.app",
              "media-src 'self'",
              "frame-src 'self' https://*.shopify.com https://689-accessories.myshopify.com",
              "object-src 'none'",
              "form-action 'self' https://*.shopify.com https://689-accessories.myshopify.com",
              "base-uri 'self'",
              "frame-ancestors 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
        ],
      },
    ];
  },

  // ═══════════════════════════════════════════
  // PERFORMANCE & SECURITY
  // ═══════════════════════════════════════════
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;