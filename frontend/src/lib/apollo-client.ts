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
  operationName?: string;
  query?: { definitions?: Array<{ name?: { value?: string } }> };
};

// During build time, return structured dummy data
// Server-side build time operation handling
const buildTimeFetch = async (operation: {
  operationName?: string;
  query?: { definitions?: Array<{ name?: { value?: string } }> };
}) => {
  const operationName =
    operation?.operationName || operation?.query?.definitions?.[0]?.name?.value || 'unknown';

  let mockData = {};

  switch (operationName) {
    case 'GetRecentPosts':
    case 'posts':
      mockData = {
        posts: {
          nodes: [
            {
              id: 'post-1',
              title: 'Placeholder Post',
              content: 'Content will be loaded at runtime',
              excerpt: 'Excerpt text',
              slug: 'placeholder',
              date: new Date().toISOString(),
              categories: { nodes: [] },
              featuredImage: { node: { sourceUrl: '', altText: '' } },
              author: {
                node: { name: 'Author', slug: 'author', id: 'author-1', avatar: { url: null } }
              }
            }
          ]
        }
      };
      break;
    case 'GetPostBySlug':
      mockData = {
        post: {
          id: 'post-1',
          title: 'Placeholder Post',
          content: 'Content will be loaded at runtime',
          date: new Date().toISOString(),
          slug: 'placeholder',
          categories: { nodes: [] },
          featuredImage: { node: { sourceUrl: '', altText: '' } },
          author: {
            node: { name: 'Author', slug: 'author', id: 'author-1', avatar: { url: null } }
          }
        }
      };
      break;
    case 'GetEvents':
    case 'events':
      mockData = {
        events: {
          nodes: [
            {
              id: 'event-1',
              title: 'Placeholder Event',
              excerpt: 'Event excerpt',
              content: 'Event content',
              date: new Date().toISOString(),
              meta: {
                eventDate: new Date().toISOString(),
                eventTime: '12:00 PM',
                eventLocation: 'Delaware',
                eventVirtualLink: null
              }
            }
          ]
        }
      };
      break;
    case 'GetLeadership':
    case 'leadership':
      mockData = {
        leadership: {
          nodes: [
            {
              id: 'leader-1',
              title: 'Placeholder Leader',
              content: 'Bio will be loaded at runtime',
              leadership: {
                role: 'Role',
                email: 'placeholder@example.com',
                order: 1
              },
              featuredImage: { node: { sourceUrl: '', altText: '' } }
            }
          ]
        }
      };
      break;
    default:
      mockData = { nodes: [] };
  }

  return new Response(JSON.stringify({ data: mockData }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
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
