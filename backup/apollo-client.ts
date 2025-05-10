import { ApolloLink, from, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from '@apollo/client-integration-nextjs';

const isDevelopment = process.env.NODE_ENV === 'development';

const graphqlUrl = isDevelopment
  ? 'http://delaware-dsa-backend.local/graphql'
  : process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '/graphql';

const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors && isDevelopment) {
      console.error('GraphQL Errors:', response.errors);
    }
    return response;
  });
});

const httpLink = new HttpLink({
  uri: graphqlUrl,
  credentials: 'same-origin',
});

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
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

        fetchPolicy: typeof window === 'undefined' ? 'network-only' : 'cache-first',
      },
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
      },
    },
  });
});

export function useApolloClient() {
  return getClient();
}
