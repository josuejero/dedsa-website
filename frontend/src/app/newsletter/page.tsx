import { Metadata } from 'next';
import Link from 'next/link';
import ErrorDisplay from '../../components/errors/ErrorDisplay';
import pageContent from '../../content/newsletter/page.json';
import { NewsletterPageContent } from '../../types/content/newsletter';

// Type assertion for imported JSON
const typedContent = pageContent as NewsletterPageContent;

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: typedContent.title,
  description: 'Latest updates from Delaware DSA',
};

// ISR: Revalidate this page every 5 minutes
export const revalidate = 300;

// GraphQL query string
const GET_RECENT_POSTS = `
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

interface Post {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
}

interface QueryData {
  posts?: { nodes: Post[] };
}

export default async function NewsletterPage() {
  const endpoint =
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
    'http://delaware-dsa-backend.local/graphql';
  let posts: Post[] = [];

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'force-cache',
      body: JSON.stringify({ query: GET_RECENT_POSTS }),
    });

    if (!res.ok) {
      throw new Error(`Network response not ok: ${res.status}`);
    }

    const json = await res.json();
    const data = (json.data ?? {}) as QueryData;
    posts = data.posts?.nodes ?? [];
  } catch (err: unknown) {
    console.error('Error fetching posts:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    return (
      <ErrorDisplay
        title={typedContent.errorTitle}
        message={typedContent.errorMessage}
        error={errorMessage}
        actionLabel={typedContent.errorActionLabel}
        actionHref="/"
      />
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container-page py-12">
        <h1 className="text-4xl font-bold mb-8">{typedContent.title}</h1>

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
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
          <p>{typedContent.noPostsMessage}</p>
        )}
      </div>
    </div>
  );
}
