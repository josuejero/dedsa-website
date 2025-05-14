/**
 * scripts/test-graphql-connection.ts
 */

import * as pkg from '@apollo/client'; // namespace import for CJS modules
const {
  ApolloClient, // extracted named exports
  HttpLink,
  InMemoryCache,
  gql,
} = pkg;

import fetch from 'node-fetch'; // Node-friendly fetch

const endpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  'http://delaware-dsa-backend.local/graphql';

const client = new ApolloClient({
  link: new HttpLink({ uri: endpoint, fetch: fetch as any }),
  cache: new InMemoryCache(),
});

const TEST_CONNECTION = gql`
  query TestConnection {
    generalSettings {
      title
      url
    }
  }
`;

async function testConnection() {
  try {
    const { data } = await client.query({ query: TEST_CONNECTION });
    console.log('Connection successful!', data.generalSettings);
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();
