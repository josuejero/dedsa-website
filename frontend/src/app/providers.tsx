// src/app/providers.tsx
'use client';

import { ApolloProvider } from '@apollo/client';
import { ReactNode, useEffect, useState } from 'react';
import { createApolloClient } from '../lib/apollo-client';

// Force skip Apollo in development if env var is set

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [client] = useState(() => createApolloClient());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!client) {
    return <>{children}</>;
  }

  return (
    <ApolloProvider client={client}>
      {mounted ? children : <div aria-hidden="true" />}
    </ApolloProvider>
  );
}
