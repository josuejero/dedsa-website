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
  const defaultData = {
    posts: { nodes: [] },
    page: { title: '', content: '', slug: '' },
    positions: { nodes: [] },
    leadership: { nodes: [] }
  };

  return new Response(
    JSON.stringify({
      data: defaultData[operation.operationName] || {}
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

const httpLink = new HttpLink({
  uri: isDevelopment ? 'http://delaware-dsa-backend.local/graphql' : '/api/graphql',
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
              merge(_existing = { nodes: [] }, incoming) {
                return incoming || { nodes: [] };
              }
            },
            page: {
              merge(existing, incoming) {
                return incoming || {};
              }
            },
            positions: {
              merge(existing = { nodes: [] }, incoming) {
                return incoming || { nodes: [] };
              }
            },
            leadership: {
              merge(existing = { nodes: [] }, incoming) {
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
