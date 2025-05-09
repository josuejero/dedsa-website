import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Configure image domains for external images
  images: {
    domains: [
      'delaware-dsa-backend.local', // For local development
      'delawardsa.org', // Production domain
      'example.com', // For sample fallback content
      // Add any other domains you need to load images from
    ],
    // Set reasonable image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Handle redirects if needed
  async redirects() {
    return [
      // Example: redirect old blog URLs to new newsletter format
      {
        source: '/blog/:slug',
        destination: '/newsletter/:slug',
        permanent: true,
      },
    ];
  },

  // Configure headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
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
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Set environment variables that should be exposed to the browser
  env: {
    NEXT_PUBLIC_EMAIL_DOMAIN: 'delawardsa.org',
  },

  // Configure compiler options
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack(config) {
    if (config.module && config.module.rules) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    }
    return config;
  },
};

module.exports = nextConfig;
