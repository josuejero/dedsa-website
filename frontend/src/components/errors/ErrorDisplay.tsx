import Link from 'next/link';
import { ErrorDisplayProps } from '../types';

export default function ErrorDisplay({
  title = 'Something went wrong',
  message = 'There was an error loading this content. Please try again later.',
  error,
  showDetails = false,
  actionLabel = 'Go back home',
  actionHref = '/',
}: ErrorDisplayProps) {
  const errMsg = error instanceof Error ? error.message : String(error || '');
  return (
    <div className="py-12">
      <div className="container-page">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg
            className="h-16 w-16 mx-auto text-dsa-red mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>
          {showDetails && errMsg && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
              <p className="text-sm font-mono text-gray-700">{errMsg}</p>
            </div>
          )}
          <div className="flex justify-center">
            <Link href={actionHref} className="btn btn-primary">
              {actionLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
