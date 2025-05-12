'use client';

import { useQuery } from '@apollo/client';
import { GET_GLOBAL_CONTENT } from '../../lib/graphql/queries/content/global';

const DEFAULT_GLOBAL_CONTENT = {
  siteName: 'Delaware DSA',
  tagline: 'Democratic Socialists of America',
  joinButtonText: 'Join Our Chapter',
  contactInfo: {
    email: 'info@delawardsa.org',
    phone: '(302) 555-0123',
    mailingAddress: 'Delaware DSA\nP.O. Box 12345\nWilmington, DE 19801',
  },
  socialLinks: {
    twitter: 'https://twitter.com/delawaredsa',
    facebook: 'https://facebook.com/delawaredsa',
    instagram: 'https://instagram.com/delawaredsa',
  },
};

export function useGlobalContent() {
  const { data, loading, error } = useQuery(GET_GLOBAL_CONTENT);

  if (loading || error) {
    return { ...DEFAULT_GLOBAL_CONTENT, loading, error };
  }

  return {
    ...data?.acfOptions?.globalContent,
    loading,
    error,
  };
}
