import { HttpLink, ApolloLink, from } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';

const isDevelopment = process.env.NODE_ENV === 'development';

// Set the WordPress GraphQL API URL based on environment
const graphqlUrl = isDevelopment
  ? 'http://delaware-dsa-backend.local/graphql'
  : process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-production-wp-domain.com/graphql';

// Error handling link
const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    // Log errors in development
    if (response.errors && isDevelopment) {
      console.error('GraphQL Errors:', response.errors);
    }
    return response;
  });
});

// Create an HTTP link to the WordPress GraphQL API
const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: 'same-origin',
});

// Initialize Apollo Client
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        // Add type policies for caching
        Query: {
          fields: {
            // Custom merge functions for paginated data
            posts: {
              keyArgs: ['where'],
              merge(existing = { nodes: [] }, incoming) {
                return {
                  ...incoming,
                  nodes: [...existing.nodes, ...incoming.nodes],
                };
              },
            },
            events: {
              keyArgs: ['where'],
              merge(existing = { nodes: [] }, incoming) {
                return {
                  ...incoming,
                  nodes: [...existing.nodes, ...incoming.nodes],
                };
              },
            },
          },
        },
      },
    }),
    link: from([errorLink, httpLink]),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        // Use network-only for server components to ensure fresh data
        fetchPolicy: typeof window === 'undefined' ? 'network-only' : 'cache-first',
      },
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
      },
    },
  });
});

// Helper function for client components to refetch data
export function useApolloClient() {
  return getClient();
}
