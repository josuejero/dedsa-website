import { ApolloLink, from, HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient
} from '@apollo/client-integration-nextjs';

const isDevelopment = process.env.NODE_ENV === 'development';
const isBrowser = typeof window !== 'undefined';
const isServerBuild = !isBrowser && process.env.NODE_ENV === 'production';

type OperationType = {
  operationName: 'posts' | 'page' | 'positions' | 'leadership' | 'events';
};

// During build time, return structured dummy data
const buildTimeFetch = async (operation: OperationType) => {
  const dummyData = {
    posts: {
      nodes: [
        {
          title: 'Placeholder Post',
          content: 'Content will be loaded at runtime',
          slug: 'placeholder'
        }
      ]
    },
    page: {
      title: 'Placeholder Page',
      content: 'Content will be loaded at runtime',
      slug: 'placeholder'
    },
    positions: {
      nodes: [
        {
          title: 'Placeholder Position',
          description: 'Position details will be loaded at runtime'
        }
      ]
    },
    leadership: {
      nodes: [
        {
          name: 'Placeholder Leader',
          role: 'Role will be loaded at runtime'
        }
      ]
    },
    events: {
      nodes: []
    }
  };

  return new Response(
    JSON.stringify({
      data: dummyData[operation.operationName] || {}
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};

const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  if (isServerBuild) {
    try {
      const operation = init?.body ? JSON.parse(init.body as string) : {};
      return buildTimeFetch(operation);
    } catch (error) {
      console.error('Error parsing operation:', error);
      return buildTimeFetch({} as OperationType);
    }
  }

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json'
    }
  });
};

const getGraphQLUri = () => {
  if (isServerBuild) return '/graphql';
  if (isDevelopment)
    return process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://delaware-dsa-backend.local/graphql';
  return '/api/graphql';
};

// Error handling link
const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors && isDevelopment) {
      console.error('GraphQL Errors:', response.errors);
    }
    return response;
  });
});

const httpLink = new HttpLink({
  uri: getGraphQLUri(),
  credentials: 'same-origin',
  fetch: customFetch
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
                  nodes: [...existing.nodes, ...incoming.nodes]
                };
              }
            },
            page: {
              merge(_, incoming) {
                return incoming || {};
              }
            },
            positions: {
              merge(existing = { nodes: [] }, incoming) {
                return {
                  ...incoming,
                  nodes: [...existing.nodes, ...incoming.nodes]
                };
              }
            },
            leadership: {
              merge(existing = { nodes: [] }, incoming) {
                return {
                  ...incoming,
                  nodes: [...existing.nodes, ...incoming.nodes]
                };
              }
            },
            events: {
              keyArgs: ['where'],
              merge(existing = { nodes: [] }, incoming) {
                return {
                  ...incoming,
                  nodes: [...existing.nodes, ...incoming.nodes]
                };
              }
            }
          }
        }
      }
    }),
    link: from([errorLink, httpLink]),
    defaultOptions: {
      query: {
        fetchPolicy: isServerBuild ? 'network-only' : 'cache-first',
        errorPolicy: 'all'
      },
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network'
      }
    }
  });
});
