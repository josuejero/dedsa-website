import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient
} from '@apollo/client-integration-nextjs';

const isDevelopment = process.env.NODE_ENV === 'development';
const isBrowser = typeof window !== 'undefined';
const isServerBuild = !isBrowser && process.env.NODE_ENV === 'production';

type OperationType = {
  operationName: 'posts' | 'page' | 'positions' | 'leadership';
};

// During build time, return structured dummy data
const buildTimeFetch = async (operation: OperationType) => {
  // Enhanced dummy data structure
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
    const operation = JSON.parse(init?.body as string);
    return buildTimeFetch(operation);
  }

  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json'
    }
  });
};

// Fallback URI if environment variables are not set
const getGraphQLUri = () => {
  if (isServerBuild) return '/graphql';
  if (isDevelopment) return 'http://delaware-dsa-backend.local/graphql';
  return '/api/graphql';
};

const httpLink = new HttpLink({
  uri: getGraphQLUri(),
  credentials: 'same-origin',
  fetch: customFetch
});

// Rest of the code remains the same...
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              merge(_, incoming) {
                return incoming || { nodes: [] };
              }
            },
            page: {
              merge(_, incoming) {
                return incoming || {};
              }
            },
            positions: {
              merge(_, incoming) {
                return incoming || { nodes: [] };
              }
            },
            leadership: {
              merge(_, incoming) {
                return incoming || { nodes: [] };
              }
            }
          }
        }
      }
    }),
    link: httpLink,
    defaultOptions: {
      query: {
        fetchPolicy: isServerBuild ? 'network-only' : 'cache-first',
        errorPolicy: 'all'
      }
    }
  });
});
