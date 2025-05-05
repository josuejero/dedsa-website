'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        <div className="text-dsa-red mb-4">
          <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Something Went Wrong</h1>

        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. Please try again or contact us if the problem
          persists.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <button onClick={reset} className="btn btn-primary">
            Try Again
          </button>

          <a href="/" className="btn btn-secondary">
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
