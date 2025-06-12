'use client';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ErrorBoundary({ children, fallback }: Props) {
  return (
    <ReactErrorBoundary fallbackRender={() => <>{fallback || <p>Something went wrong.</p>}</>}>
      {children}
    </ReactErrorBoundary>
  );
}
