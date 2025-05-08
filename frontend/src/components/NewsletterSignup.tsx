'use client';

import React from 'react';
import { useNewsletterSubscription } from '../hooks/useNewsletterSubscription';

interface NewsletterSignupProps {
  variant?: 'banner' | 'sidebar' | 'footer';
  title?: string;
  description?: string;
}

export default function NewsletterSignup({
  variant = 'banner',
  title = 'Stay Updated',
  description = 'Subscribe to our newsletter to receive the latest updates, events, and actions.',
}: NewsletterSignupProps) {
  const { email, setEmail, subscribe, isSubmitting, isSuccess, isError, errorMessage, reset } =
    useNewsletterSubscription();

  // Different styles based on variant
  const containerClasses = {
    banner: 'bg-dsa-red text-white p-6 rounded-lg',
    sidebar: 'bg-white p-6 rounded-lg shadow-md',
    footer: 'bg-gray-800 text-white p-6 rounded-lg',
  }[variant];

  const buttonClasses = {
    banner:
      'mt-2 sm:mt-0 w-full sm:w-1/3 bg-white text-dsa-red font-bold p-2 rounded-r hover:bg-gray-100',
    sidebar: 'mt-2 w-full bg-dsa-red text-white font-bold p-2 rounded hover:bg-red-700',
    footer:
      'mt-2 sm:mt-0 w-full sm:w-1/3 bg-dsa-red text-white font-bold p-2 rounded-r hover:bg-red-700',
  }[variant];

  const inputClasses = {
    banner: 'w-full sm:w-2/3 p-2 text-black rounded-l focus:outline-none',
    sidebar:
      'w-full p-2 text-black rounded border-gray-300 focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50',
    footer: 'w-full sm:w-2/3 p-2 text-black rounded-l focus:outline-none',
  }[variant];

  // Success state
  if (isSuccess) {
    return (
      <div className={containerClasses}>
        <div className="text-center">
          <svg
            className="h-12 w-12 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Thank You!</h2>
          <p className="mb-4">You've been successfully subscribed to our newsletter.</p>
          <button
            onClick={reset}
            className={variant === 'sidebar' ? buttonClasses : 'underline hover:no-underline'}
          >
            Subscribe another email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>

      <form onSubmit={subscribe} className="flex flex-col sm:flex-row">
        {isError && <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">{errorMessage}</div>}

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClasses}
          required
        />

        <button type="submit" disabled={isSubmitting} className={buttonClasses}>
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Subscribing...
            </span>
          ) : (
            'Subscribe'
          )}
        </button>
      </form>
    </div>
  );
}
