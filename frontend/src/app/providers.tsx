'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { getClient } from '../lib/apollo-client';

export function Providers({ children }: { children: ReactNode }) {
  // This ensures hydration matching by delaying client-side rendering
  // until the component has mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return children without Apollo wrapper during SSR
    // to avoid hydration mismatches
    return <>{children}</>;
  }

  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
