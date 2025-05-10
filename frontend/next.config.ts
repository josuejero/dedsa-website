import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const analyzeBuild = process.env.ANALYZE === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'delawardsa.org',
        pathname: '/**'
      },
      {
        protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
        hostname:
          process.env.NODE_ENV === 'development'
            ? 'delaware-dsa-backend.local'
            : process.env.WORDPRESS_HOST || '',
        pathname: '/**'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256]
  },

  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/newsletter/:slug',
        permanent: true
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' data: https: http:`,
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'block-all-mixed-content'
            ].join('; ')
          },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      },
      {
        source: '/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }
    ];
  },

  env: {
    NEXT_PUBLIC_EMAIL_DOMAIN: process.env.NEXT_PUBLIC_EMAIL_DOMAIN || 'delawardsa.org'
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

// Wrap your config
const configWithBundleAnalyzer = withBundleAnalyzer({
  enabled: analyzeBuild
})(nextConfig);

export default configWithBundleAnalyzer;
