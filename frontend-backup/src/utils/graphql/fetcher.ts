// Simple GraphQL fetcher to replace Apollo Client

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export type Variables = Record<string, unknown>; // Changed from any to unknown

/**
 * Simple GraphQL fetcher function
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Variables,
  options?: RequestInit
): Promise<GraphQLResponse<T>> {
  const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '/api/graphql';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      ...options,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error('GraphQL fetch error:', error);
    return {
      errors: [
        { message: error instanceof Error ? error.message : String(error) },
      ],
    };
  }
}

/**
 * Type-safe query function
 */
export function createQuery<TData, TVariables extends Variables = Variables>(
  query: string
) {
  return async (
    variables?: TVariables,
    options?: RequestInit
  ): Promise<GraphQLResponse<TData>> => {
    return fetchGraphQL<TData>(query, variables, options);
  };
}
