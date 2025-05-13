// src/app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { createApolloClient } from '../lib/apollo-client';

// Check if we're in the not-found page to skip Apollo
const isBuildTime =
  typeof window === 'undefined' && process.env.NODE_ENV === 'production';
const skipApollo =
  process.env.NEXT_PUBLIC_SKIP_APOLLO_SSR === 'true' || isBuildTime;

export function Providers({ children }: { children: ReactNode }) {
  // This ensures hydration matching by delaying client-side rendering
  const [mounted, setMounted] = useState(false);

  // Skip Apollo initialization if needed
  const [client] = useState(() => {
    try {
      return createApolloClient();
    } catch (e) {
      console.error('Failed to create Apollo client:', e);
      // Return a minimal client if creation fails
      return null;
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // If we're in a not-found page or during build, skip Apollo entirely
  if (skipApollo || !client) {
    return <>{children}</>;
  }

  if (!mounted) {
    return <>{children}</>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
