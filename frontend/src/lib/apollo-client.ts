// src/lib/apollo-client.ts

import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Observable,
  Operation,
  from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Determine if we're on the server
const isServer = typeof window === 'undefined';

// Only use mockLink in development (so prod builds hit your real GraphQL endpoint)
const useMockLink = process.env.NODE_ENV === 'development';

// Your WordPress /api/graphql endpoint (via NEXT_PUBLIC_WORDPRESS_API_URL, falling back to raw URL)
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

// Enhanced error logging
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(
        `[GraphQL error]: Message: ${err.message}, Location: ${JSON.stringify(
          err.locations
        )}, Path: ${err.path}`,
        operation.operationName
      );
    }
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// Generate mock responses for typical operations in development
function createMockResponseForOperation(operation: Operation) {
  switch (operation.operationName) {
    case 'GetRecentPosts':
      return { posts: { nodes: [] } };
    case 'GetPostBySlug':
      return { post: null };
    case 'GetPositionsPage':
      return { page: { content: '' }, positions: { nodes: [] } };
    case 'GetUdYdsaPage':
      return { page: { content: '' } };
    case 'GetContactInfo':
      return { page: { content: '', contactInfo: null } };
    case 'GetJoinPage':
      return { page: { content: '' } };
    case 'GetLeadership':
      return { page: { content: '' }, leadership: { nodes: [] } };
    case 'GetBylawsPage':
      return { page: { content: '', bylaws: null } };
    case 'GetAboutPage':
      return { page: { content: '', about: null } };
    case 'GetEvents':
      return { events: { nodes: [] } };
    default:
      return {}; // Catch‐all for any other operations
  }
}

// A mock link that returns the above dummy data in development
const mockLink = new ApolloLink((operation) => {
  return new Observable<FetchResult>((observer) => {
    const mockData = createMockResponseForOperation(operation);
    observer.next({ data: mockData });
    observer.complete();
    return () => {};
  });
});

// Single ApolloClient instance for SSR/CSR
let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

export function getClient() {
  if (isServer || !clientInstance) {
    try {
      const httpLink = new HttpLink({
        uri: wpGraphQLEndpoint,
        credentials: 'same-origin',
      });

      // In development use mockLink; in production always use the real HTTP link
      const activeLink = useMockLink ? mockLink : httpLink;

      clientInstance = new ApolloClient({
        ssrMode: isServer,
        link: from([errorLink, activeLink]),
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
    } catch (e) {
      console.error('Failed to initialize Apollo Client:', e);
      // Fallback minimal client
      clientInstance = new ApolloClient({
        ssrMode: isServer,
        link: new ApolloLink(() => {
          return new Observable((observer) => {
            observer.next({ data: {} });
            observer.complete();
            return () => {};
          });
        }),
        cache: new InMemoryCache(),
        defaultOptions: {
          query: { fetchPolicy: 'cache-only', errorPolicy: 'all' },
        },
      });
    }
  }
  return clientInstance;
}

export const createApolloClient = getClient;
