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

// Detect environment
const isServer = typeof window === 'undefined';
const isBuildTime = isServer && process.env.NODE_ENV === 'production';

// Always use mock during build time in production or when explicitly requested
const useMockData =
  isBuildTime || process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// API endpoint
const wpGraphQLEndpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  (process.env.NODE_ENV === 'development'
    ? 'http://delaware-dsa-backend.local/graphql'
    : '/api/graphql');

// Cache configuration
const cacheConfig = {
  typePolicies: {
    Post: {
      keyFields: ['id'],
      fields: {
        date: { merge: true },
      },
    },
    Page: {
      fields: {
        content: {
          merge(existing: string | undefined, incoming: string): string {
            return incoming || existing || '';
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

// Error link with improved logging
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.error(
        `[GraphQL error in ${operation.operationName}]: ${err.message}`
      );
    }
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError.message}`);
  }
});

// Generate mock responses with improved structure
function createMockResponseForOperation(operation: Operation) {
  const defaultPost = {
    id: 'mock-1',
    title: 'Mock Post',
    slug: 'mock-post',
    date: new Date().toISOString(),
    excerpt: '<p>This is mock content generated during build.</p>',
    content: '<p>This is mock content generated during build.</p>',
    featuredImage: {
      node: { sourceUrl: '/api/placeholder/400/300', altText: 'Placeholder' },
    },
    author: { node: { name: 'Mock Author' } },
    categories: {
      nodes: [{ id: 'cat-1', name: 'Category', slug: 'category' }],
    },
  };

  // Common mock structure for all pages
  const defaultPage = {
    id: 'mock-page-1',
    title: 'Mock Page',
    content: '<p>This is mock content generated during build.</p>',
    slug: 'mock-page',
  };

  switch (operation.operationName) {
    case 'GetRecentPosts':
      return {
        posts: {
          nodes: [
            defaultPost,
            { ...defaultPost, id: 'mock-2', title: 'Mock Post 2' },
            { ...defaultPost, id: 'mock-3', title: 'Mock Post 3' },
          ],
        },
      };
    case 'GetPostBySlug':
      return { post: defaultPost };
    case 'GetPositionsPage':
      return {
        page: { ...defaultPage, content: '<p>Mock positions page</p>' },
        positions: {
          nodes: [
            {
              id: 'pos-1',
              title: 'Position',
              content: '<p>Description</p>',
              menuOrder: 1,
            },
            {
              id: 'pos-2',
              title: 'Position 2',
              content: '<p>Another description</p>',
              menuOrder: 2,
            },
          ],
        },
      };
    case 'GetUdYdsaPage':
      return {
        page: {
          ...defaultPage,
          content: '<p>Mock YDSA page</p>',
          udYdsa: {
            contactEmail: 'mock@example.org',
            meetingLocation: 'Mock Location',
            meetingSchedule: 'Every mock day',
            socialMedia: {
              instagram: 'https://instagram.com',
              twitter: 'https://twitter.com',
              facebook: 'https://facebook.com',
            },
          },
        },
      };
    case 'GetContactInfo':
      return {
        page: {
          ...defaultPage,
          content: '<p>Mock contact page</p>',
          contactInfo: {
            email: 'mock@example.org',
            phone: '(555) 555-5555',
            mailingAddress: 'Mock Address',
          },
        },
      };
    case 'GetJoinPage':
      return {
        page: {
          ...defaultPage,
          content: '<p>Mock join page</p>',
        },
      };
    case 'GetLeadership':
      return {
        page: { ...defaultPage, content: '<p>Mock leadership page</p>' },
        leadership: {
          nodes: [
            {
              id: 'leader-1',
              title: 'Mock Leader',
              content: '<p>Mock bio</p>',
              leadership: {
                role: 'Mock Role',
                email: 'mock@example.org',
                order: 1,
              },
            },
            {
              id: 'leader-2',
              title: 'Mock Leader 2',
              content: '<p>Mock bio 2</p>',
              leadership: {
                role: 'Mock Role 2',
                email: 'mock2@example.org',
                order: 2,
              },
            },
          ],
        },
      };
    case 'GetBylawsPage':
      return {
        page: {
          ...defaultPage,
          content: '<p>Mock bylaws page</p>',
          bylaws: {
            pdfUrl: '/mock.pdf',
            lastUpdated: new Date().toISOString().split('T')[0],
          },
        },
      };
    case 'GetAboutPage':
      return {
        page: {
          ...defaultPage,
          content: '<p>Mock about page</p>',
          about: {
            foundingYear: 2020,
            achievements: ['Mock achievement'],
            missionStatement: 'Mock mission statement',
          },
        },
      };
    case 'GetEvents':
      return {
        events: {
          nodes: [
            {
              id: 'event-1',
              title: 'Mock Event',
              excerpt: '<p>Mock excerpt</p>',
              content: '<p>Mock content</p>',
              date: new Date().toISOString(),
              meta: {
                eventDate: new Date().toISOString(),
                eventTime: '12:00 PM',
                eventLocation: 'Mock Location',
                eventVirtualLink: 'https://example.com',
              },
            },
            {
              id: 'event-2',
              title: 'Mock Event 2',
              excerpt: '<p>Mock excerpt 2</p>',
              content: '<p>Mock content 2</p>',
              date: new Date().toISOString(),
              meta: {
                eventDate: new Date(
                  new Date().setDate(new Date().getDate() + 7)
                ).toISOString(),
                eventTime: '2:00 PM',
                eventLocation: 'Another Mock Location',
                eventVirtualLink: null,
              },
            },
          ],
        },
      };
    default:
      return {
        post: defaultPost,
        page: defaultPage,
        posts: { nodes: [defaultPost] },
      };
  }
}

// Enhanced mock link with better error handling
const mockLink = new ApolloLink((operation) => {
  return new Observable<FetchResult>((observer) => {
    try {
      const mockData = createMockResponseForOperation(operation);
      observer.next({ data: mockData });
      observer.complete();
    } catch (error) {
      observer.error(new Error(`Mock data generation failed: ${error}`));
    }
    return () => {};
  });
});

// Client singleton with better initialization
let clientInstance: ApolloClient<NormalizedCacheObject> | null = null;

export function getClient() {
  const skipApollo = process.env.NEXT_PUBLIC_SKIP_APOLLO_SSR === 'true';

  if (skipApollo) {
    console.log(
      'Skipping Apollo Client initialization as requested via env var'
    );
    return new ApolloClient({
      ssrMode: isServer,
      link: mockLink,
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          errorPolicy: 'all',
          fetchPolicy: 'cache-only',
        },
      },
    });
  }

  if (isServer || !clientInstance) {
    try {
      // Set up HTTP link for real API requests
      const httpLink = new HttpLink({
        uri: wpGraphQLEndpoint,
        credentials: 'same-origin',
      });

      // Always use mock data during build or when in development
      const activeLink = useMockData ? mockLink : httpLink;

      // Create the client with appropriate settings
      clientInstance = new ApolloClient({
        ssrMode: isServer,
        link: from([errorLink, activeLink]),
        cache: new InMemoryCache(cacheConfig),
        defaultOptions: {
          query: {
            fetchPolicy: isBuildTime
              ? 'cache-only'
              : isServer
                ? 'network-only'
                : 'cache-first',
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
      // Create a dummy client that won't throw errors
      clientInstance = new ApolloClient({
        ssrMode: isServer,
        link: mockLink,
        cache: new InMemoryCache(),
        defaultOptions: {
          query: {
            errorPolicy: 'all',
            fetchPolicy: 'cache-only',
          },
        },
      });
    }
  }
  return clientInstance;
}

export const createApolloClient = getClient;
