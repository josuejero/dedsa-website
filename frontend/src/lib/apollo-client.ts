import { HttpLink } from '@apollo/client';
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

// Create an HTTP link to the WordPress GraphQL API
const httpLink = new HttpLink({
  uri: graphqlUrl,
});

// Initialize Apollo Client
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache', // Don't cache on the server
        errorPolicy: 'all',
      },
    },
  });
});
