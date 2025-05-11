import { ApolloError } from '@apollo/client';

import { ErrorType, FormattedError } from '../types';

export function formatGraphQLError(error: unknown): FormattedError {
  if (error instanceof ApolloError) {
    // Handle network errors
    if (error.networkError) {
      return {
        type: ErrorType.NETWORK,
        message:
          'Unable to connect to the server. Please check your internet connection and try again.',
        originalError: error,
      };
    }

    // Handle GraphQL errors
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const gqlError = error.graphQLErrors[0];

      // You can expand this to handle more error codes
      switch (gqlError.extensions?.code) {
        case 'UNAUTHENTICATED':
          return {
            type: ErrorType.AUTHENTICATION,
            message: 'You need to be logged in to access this content.',
            originalError: gqlError,
          };
        case 'FORBIDDEN':
          return {
            type: ErrorType.AUTHORIZATION,
            message: "You don't have permission to access this content.",
            originalError: gqlError,
          };
        case 'NOT_FOUND':
          return {
            type: ErrorType.NOT_FOUND,
            message: 'The requested content could not be found.',
            originalError: gqlError,
          };
        case 'BAD_USER_INPUT':
          return {
            type: ErrorType.VALIDATION,
            message: 'There was a problem with the data submitted.',
            originalError: gqlError,
          };
        case 'INTERNAL_SERVER_ERROR':
          return {
            type: ErrorType.SERVER,
            message:
              'There was a problem with our servers. Please try again later.',
            originalError: gqlError,
          };
        default:
          return {
            type: ErrorType.UNKNOWN,
            message: gqlError.message || 'An unknown error occurred.',
            originalError: gqlError,
          };
      }
    }
  }

  // Default error handling
  return {
    type: ErrorType.UNKNOWN,
    message:
      error instanceof Error ? error.message : 'An unknown error occurred.',
    originalError: error,
  };
}

export function getErrorDisplay(error: unknown): {
  title: string;
  message: string;
} {
  const formattedError = formatGraphQLError(error);

  switch (formattedError.type) {
    case ErrorType.NETWORK:
      return {
        title: 'Connection Error',
        message: formattedError.message,
      };
    case ErrorType.AUTHENTICATION:
      return {
        title: 'Authentication Required',
        message: formattedError.message,
      };
    case ErrorType.AUTHORIZATION:
      return {
        title: 'Access Denied',
        message: formattedError.message,
      };
    case ErrorType.NOT_FOUND:
      return {
        title: 'Content Not Found',
        message: formattedError.message,
      };
    case ErrorType.VALIDATION:
      return {
        title: 'Invalid Data',
        message: formattedError.message,
      };
    case ErrorType.SERVER:
      return {
        title: 'Server Error',
        message: formattedError.message,
      };
    default:
      return {
        title: 'Something Went Wrong',
        message: formattedError.message,
      };
  }
}
