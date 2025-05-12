import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Determine if we're on the server
const isServer = typeof window === 'undefined';

// Define the GraphQL endpoint
const isDevelopment = process.env.NODE_ENV === 'development';
const wpGraphQLEndpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  (isDevelopment
    ? 'http://delaware-dsa-backend.local/graphql'
    : '/api/graphql');

// Configure the cache with type policies
const cacheConfig = {
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
      merge: true,
      fields: {
        content: {
          merge(existing: string | undefined, incoming: string) {
            return incoming || existing;
          },
        },
      },
    },
    Query: {
      fields: {
        page: {
          read() {
            return null;
          },
        },
      },
    },
  },
};

// Enhanced error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`,
        operation.operationName
      );
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// Create a client with appropriate settings for server/client
let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

export function getClient() {
  // For SSR, always create a new client
  if (isServer || !clientInstance) {
    // Create appropriate link based on environment
    const httpLink = new HttpLink({
      uri: wpGraphQLEndpoint,
      credentials: 'same-origin',
    });

    clientInstance = new ApolloClient({
      ssrMode: isServer,
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache(cacheConfig),
      defaultOptions: {
        query: {
          fetchPolicy: isServer ? 'network-only' : 'cache-first',
          errorPolicy: 'all',
        },
        watchQuery: {
          fetchPolicy: 'cache-and-network',
          errorPolicy: 'all',
        },
      },
    });
  }

  return clientInstance;
}

// Add this if you need to support the previous function name
export const createApolloClient = getClient;
