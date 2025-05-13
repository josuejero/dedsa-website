// src/app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { createApolloClient } from '../lib/apollo-client';

// Force skip Apollo in development if env var is set
const skipApollo = process.env.NEXT_PUBLIC_SKIP_APOLLO_SSR === 'true';

export function Providers({ children }: { children: ReactNode }) {
  // This ensures hydration matching by delaying client-side rendering
  const [mounted, setMounted] = useState(false);

  // Skip Apollo initialization completely if needed
  const [client] = useState(() => {
    if (skipApollo) {
      console.log('Skipping Apollo Client initialization as requested');
      return null;
    }

    try {
      return createApolloClient();
    } catch (e) {
      console.error('Failed to create Apollo client:', e);
      return null;
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // If Apollo is skipped or failed to initialize, render without the provider
  if (skipApollo || !client) {
    return <>{children}</>;
  }

  if (!mounted) {
    return <>{children}</>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
