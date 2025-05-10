import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // SWC minification is enabled by default in Next.js v15; the `swcMinify` option was removed
  images: {
    // Use strict remotePatterns instead of domains for safer, wildcard support :contentReference[oaicite:11]{index=11}
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'delawardsa.org',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'delaware-dsa-backend.local',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**'
      }
    ],
    // Serve AVIF/WebP for modern browsers to reduce payload size
    formats: ['image/avif', 'image/webp'],
    // Device and static image size breakpoints (defaults match Next.js recommendations) :contentReference[oaicite:13]{index=13}
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Example redirect: /blog/:slug → /newsletter/:slug
  async redirects() {
    return [
      {
        source: '/blog/:slug',
        destination: '/newsletter/:slug',
        permanent: true
      }
    ];
  },

  // Global security and caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Enforce HTTPS for two years + subdomains + preload
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Basic CSP: only self scripts/styles, images from allowed host
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self'",
              "style-src 'self'",
              "img-src 'self' https://delawardsa.org",
              "object-src 'none'"
            ].join('; ')
          },
          // Cache static assets for one year immutable
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
        ]
      }
    ];
  },

  // Expose only public env vars to the client
  env: {
    NEXT_PUBLIC_EMAIL_DOMAIN: 'delawardsa.org'
  },

  // Strip console.* calls in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },

  // App Router is enabled by default in Next.js 14+
  experimental: {},

  // Proxy API routes or other paths as needed
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*'
      }
    ];
  },

  // Custom Webpack config: SVGR loader for importing SVGs as React components
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack']
    });
    return config;
  }
};

// Optional: integrate bundle analyzer (uncomment to enable)
// import withBundleAnalyzer from '@next/bundle-analyzer';
// export default withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })(nextConfig);

export default nextConfig;
