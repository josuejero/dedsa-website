'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { createApolloClient } from '../lib/apollo-client';

export function Providers({ children }: { children: ReactNode }) {
  // This ensures hydration matching by delaying client-side rendering
  const [mounted, setMounted] = useState(false);
  const [client] = useState(() => createApolloClient());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
