import { ApolloError, gql } from '@apollo/client';
import { Metadata } from 'next';
import Link from 'next/link';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import { getClient } from '../../lib/apollo-client';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'Latest updates from Delaware DSA',
};

// Simple query to get recent posts
const GET_RECENT_POSTS = gql`
  query GetRecentPosts {
    posts(first: 10) {
      nodes {
        id
        title
        date
        slug
        excerpt
      }
    }
  }
`;

// Add interface for Post type
interface Post {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
}

interface QueryData {
  posts?: {
    nodes: Post[];
  };
}

export default async function NewsletterPage() {
  let data: QueryData = { posts: { nodes: [] } }; // Default empty data

  try {
    const result = await getClient().query<QueryData>({
      query: GET_RECENT_POSTS,
    });
    data = result.data;
  } catch (error) {
    console.error('Error fetching posts:', error);

    // Different error handling based on error type
    if (error instanceof ApolloError) {
      if (error.networkError) {
        return (
          <ErrorDisplay
            title="Network Error"
            message="We're having trouble connecting to our servers. Please check your internet connection and try again."
            error={error}
          />
        );
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        return (
          <ErrorDisplay
            title="Data Error"
            message="There was a problem with the data. Our team has been notified."
            error={error.graphQLErrors[0]}
            showDetails={process.env.NODE_ENV === 'development'}
          />
        );
      }
    }

    // Generic error fallback
    return (
      <ErrorDisplay
        error={error}
        showDetails={process.env.NODE_ENV === 'development'}
        actionLabel="Return to Home"
        actionHref="/"
      />
    );
  }

  // Use optional chaining and nullish coalescing for safe data access
  const posts = data?.posts?.nodes ?? [];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page">
        <h1 className="text-4xl font-bold mb-8">Newsletter</h1>

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post: Post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    href={`/newsletter/${post.slug}`}
                    className="text-dsa-red hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-2">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  className="mb-4"
                />
                <Link
                  href={`/newsletter/${post.slug}`}
                  className="text-dsa-red font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}
