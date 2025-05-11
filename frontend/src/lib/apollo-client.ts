import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { onError } from '@apollo/client/link/error';

const isDevelopment = process.env.NODE_ENV === 'development';
const wpGraphQLEndpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  (isDevelopment
    ? 'http://delaware-dsa-backend.local/graphql'
    : '/api/graphql');

// Configure the cache with type policies for better normalization and merging
const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      keyFields: ['id'],
      fields: {
        date: {
          merge: true,
        },
      },
    },
    Page: {
      // Don't use keyFields at all for Page
      // This allows Apollo to handle pages without specific identifiers
      merge: true, // Enable merging
      fields: {
        content: {
          merge(existing, incoming) {
            return incoming || existing;
          },
        },
      },
    },
    Query: {
      fields: {
        page: {
          // Custom read function for the page field on Query
          // eslint-disable-next-line no-empty-pattern
          read({}) {
            // Handle missing data gracefully
            return null; // Allow query to proceed even if cache misses
          },
        },
      },
    },
  },
});

// Enhanced error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
        operation.operationName
      );

      // You could implement custom handling based on error types
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        // Handle authentication errors
        console.error('Authentication error - please log in again');
      }
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
    // You could implement retry logic here
    // return fromPromise(
    //   new Promise(resolve => setTimeout(() => resolve(), 1000))
    // ).flatMap(() => forward(operation));
  }
});

// HTTP link for actual GraphQL endpoint
const httpLink = new HttpLink({
  uri: wpGraphQLEndpoint,
  credentials: 'same-origin',
});

// Register the Apollo Client with Next.js integration
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient<NormalizedCacheObject>({
    link: from([errorLink, httpLink]),
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all', // This allows components to render with partial data even if there are errors
      },
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
    },
  });
});
