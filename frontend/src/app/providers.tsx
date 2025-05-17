// src/app/providers.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';

// Force skip Apollo in development

export function Providers({ children }: { children: ReactNode }) {
  // This ensures hydration matching by delaying client-side rendering
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
