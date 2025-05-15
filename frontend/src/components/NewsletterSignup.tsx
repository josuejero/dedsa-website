'use client';

import newsletterContent from '../content/components/newsletterSignup.json';
import { useNewsletterSubscription } from '../hooks/useNewsletterSubscription';
import { NewsletterSignupContent } from '../types/content/components';
import { NewsletterSignupProps } from './types';

// Type assertion for the imported JSON
const typedNewsletterContent = newsletterContent as NewsletterSignupContent;

export default function NewsletterSignup({
  variant = 'banner',
  title,
  description,
}: NewsletterSignupProps) {
  const {
    email,
    setEmail,
    subscribe,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    reset,
  } = useNewsletterSubscription();

  // Use provided title/description or fallback to content from JSON file
  const variantContent = typedNewsletterContent.variants[variant];
  const displayTitle = title || variantContent.title;
  const displayDescription = description || variantContent.description;

  const containerClasses = {
    banner: 'bg-dsa-red text-white p-6 rounded-lg',
    sidebar: 'bg-white p-6 rounded-lg shadow-md',
    footer: 'bg-gray-800 text-white p-6 rounded-lg',
  }[variant];

  const buttonClasses = {
    banner:
      'mt-2 sm:mt-0 w-full sm:w-1/3 bg-white text-dsa-red font-bold p-2 rounded-r hover:bg-gray-100',
    sidebar:
      'mt-2 w-full bg-dsa-red text-white font-bold p-2 rounded hover:bg-red-700',
    footer:
      'mt-2 sm:mt-0 w-full sm:w-1/3 bg-dsa-red text-white font-bold p-2 rounded-r hover:bg-red-700',
  }[variant];

  const inputClasses = {
    banner: 'w-full sm:w-2/3 p-2 text-black rounded-l focus:outline-none',
    sidebar:
      'w-full p-2 text-black rounded border-gray-300 focus:border-dsa-red focus:ring focus:ring-dsa-red focus:ring-opacity-50',
    footer: 'w-full sm:w-2/3 p-2 text-black rounded-l focus:outline-none',
  }[variant];

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="text-xl font-bold mb-2">
            {typedNewsletterContent.success.title}
          </h2>
          <p className="mb-4">{typedNewsletterContent.success.message}</p>
          <button
            onClick={reset}
            className={
              variant === 'sidebar'
                ? buttonClasses
                : 'underline hover:no-underline'
            }
          >
            {typedNewsletterContent.success.buttonText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <h2 className="text-xl font-bold mb-2">{displayTitle}</h2>
      <p className="mb-4">{displayDescription}</p>

      <form onSubmit={subscribe} className="flex flex-col sm:flex-row">
        {isError && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded">
            {errorMessage || typedNewsletterContent.error.defaultMessage}
          </div>
        )}

        <input
          type="email"
          placeholder={typedNewsletterContent.inputPlaceholder}
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
                xmlns="http:"
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
              {typedNewsletterContent.loadingText}
            </span>
          ) : (
            typedNewsletterContent.buttonText
          )}
        </button>
      </form>
    </div>
  );
}
