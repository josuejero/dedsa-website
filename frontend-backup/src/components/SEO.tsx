import { Metadata } from 'next';

const SEO_DEFAULTS = {
  siteName: 'Delaware DSA',
  locale: 'en_US',
  type: 'website' as const,
  twitterHandle: '@DelawareDSA',
  defaultImage: {
    url: '/og-default.jpg',
    width: 1200,
    height: 630,
    alt: 'Delaware DSA',
  },
};

interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: OpenGraphImage[];
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
  };
}

export function generateMetadata({
  title,
  description,
  canonical,
  openGraph,
  twitter,
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: canonical
      ? {
          canonical: canonical,
        }
      : undefined,
    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: canonical ? `${baseUrl}${canonical}` : baseUrl,
      siteName: SEO_DEFAULTS.siteName,
      locale: SEO_DEFAULTS.locale,
      type: SEO_DEFAULTS.type,
      images: openGraph?.images || [SEO_DEFAULTS.defaultImage],
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      site: twitter?.site || SEO_DEFAULTS.twitterHandle,
      creator: twitter?.creator,
    },
  };
}
