import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';
import { registerApolloClient } from '@apollo/client-integration-nextjs';
import { Observable } from 'zen-observable-ts';

const isDevelopment = process.env.NODE_ENV === 'development';
const wpGraphQLEndpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  (isDevelopment ? 'http://delaware-dsa-backend.local/graphql' : '/api/graphql');

// Mock link for development/testing
const mockLink = new ApolloLink((operation) => {
  const operationName = operation.operationName ?? 'unknown';
  let mockData: Record<string, unknown> = {};

  switch (operationName) {
    case 'GET_JOIN_PAGE':
      mockData = {
        page: {
          content: `<p>Join us in building a more just and democratic society! Delaware DSA is a chapter of the Democratic Socialists of America, the largest socialist organization in the United States.</p>
          <p>By becoming a member, you'll be part of a growing movement fighting for economic justice, healthcare for all, housing as a human right, and genuine democracy in our workplaces and communities.</p>`,
          title: 'Join DSA',
          slug: 'join'
        }
      };
      break;
    case 'GetPositionsPage':
      mockData = {
        page: {
          content:
            '<p>Our positions and values guide our work for social, economic, and environmental justice.</p>'
        },
        positions: {
          nodes: [
            {
              id: 'position-1',
              title: 'Economic Justice',
              content: 'We believe in economic democracy and justice for all.',
              menuOrder: 1
            },
            {
              id: 'position-2',
              title: 'Healthcare',
              content: 'We fight for universal healthcare as a human right.',
              menuOrder: 2
            }
          ]
        }
      };
      break;
    default:
      return null;
  }

  return new Observable((observer) => {
    observer.next({ data: mockData });
    observer.complete();
  });
});

// Configure the cache with type policies for better normalization and merging
const cache = new InMemoryCache({
  typePolicies: {
    Post: {
      keyFields: ['id'],
      fields: {
        date: {
          merge: true
        }
      }
    },
    Page: {
      keyFields: ['slug']
    }
  }
});

// Error link logs GraphQL errors and can be extended to report to monitoring services
const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      // TODO: send errors to an external monitoring service if desired
    }
    return response;
  });
});

// HTTP link for actual GraphQL endpoint
const httpLink = new HttpLink({
  uri: wpGraphQLEndpoint,
  credentials: 'same-origin'
});

// Register the Apollo Client with Next.js integration
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient<NormalizedCacheObject>({
    link: ApolloLink.from(isDevelopment ? [mockLink, errorLink, httpLink] : [errorLink, httpLink]),
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-first',
        errorPolicy: 'all'
      },
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      }
    }
  });
});
