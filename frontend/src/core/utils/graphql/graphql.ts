// Simple replacement for Apollo Client functionality
import { fetchGraphQL } from '../utils/graphql/fetcher';

/**
 * Get all post slugs for static generation
 */
export async function getAllPostSlugs() {
  const query = `
    query GetAllPostSlugs {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  const response = await fetchGraphQL<{
    posts: { nodes: Array<{ slug: string }> };
  }>(query);
  return response.data?.posts?.nodes || [];
}

/**
 * Simple replacement for getClient().query for transitioning from Apollo
 */
export const queryGraphQL = async <T>(
  query: string,
  variables?: Record<string, unknown>
) => {
  const response = await fetchGraphQL<T>(query, variables);

  return {
    data: response.data || ({} as T),
    error: response.errors ? new Error(response.errors[0]?.message) : undefined,
  };
};
