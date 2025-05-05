import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://delawaredsaexample.org';

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
      siteName: 'Delaware DSA',
      locale: 'en_US',
      type: 'website',
      images: openGraph?.images || [
        {
          url: `${baseUrl}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: 'Delaware DSA',
        },
      ],
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      site: twitter?.site || '@DelawareDSA',
      creator: twitter?.creator,
    },
  };
}
