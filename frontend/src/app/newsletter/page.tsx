import Link from 'next/link';
import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import NewsletterCategoryFilter from './NewsletterCategoryFilter';
import { Metadata } from 'next';

// Define metadata for the page
export const metadata: Metadata = {
  title: 'Newsletter',
  description:
    'Latest news, updates, and articles from the Delaware chapter of the Democratic Socialists of America.',
};

// GraphQL query to fetch posts and categories
const GET_POSTS_AND_CATEGORIES = gql`
  query GetPostsAndCategories {
    posts(first: 20) {
      nodes {
        id
        title
        date
        slug
        excerpt
        categories {
          nodes {
            id
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

// Types for our posts
interface Post {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;
}

// Main newsletter page component
export default async function Newsletter({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Get the selected category from URL params
  const selectedCategory = searchParams.category || null;

  // Fetch posts and categories using Apollo Client
  const { data } = await getClient().query({
    query: GET_POSTS_AND_CATEGORIES,
  });

  const posts: Post[] = data?.posts?.nodes || [];
  const categories = data?.categories?.nodes || [];

  // Filter posts by selected category
  const filteredPosts = selectedCategory
    ? posts.filter((post) => post.categories.nodes.some((cat) => cat.slug === selectedCategory))
    : posts;

  return (
    <div className="bg-gray-100 py-8">
      <div className="container-page">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold">Newsletter</h1>
          <p className="text-xl text-gray-600 mt-2">
            Latest news, updates, and articles from Delaware DSA
          </p>
        </header>

        <div className="flex flex-col lg:flex-row">
          {/* Main Content */}
          <main className="lg:w-3/4 lg:pr-8">
            {/* Newsletter Signup Banner */}
            <div className="bg-dsa-red text-white p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
              <p className="mb-4">
                Subscribe to our newsletter to receive the latest updates, events, and actions.
              </p>
              <form className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full sm:w-2/3 p-2 text-black rounded-l focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-2 sm:mt-0 w-full sm:w-1/3 bg-white text-dsa-red font-bold p-2 rounded-r hover:bg-gray-100"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Post Listing */}
            <div className="space-y-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                      {post.featuredImage?.node && (
                        <div className="md:w-1/3 h-48 md:h-auto">
                          <img
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-6 md:w-2/3">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <p className="text-gray-500 text-sm mb-3">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        {post.categories.nodes.length > 0 && (
                          <div className="flex flex-wrap mb-3">
                            {post.categories.nodes.map((cat) => (
                              <span
                                key={cat.id}
                                className="mr-2 mb-2 px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                              >
                                {cat.name}
                              </span>
                            ))}
                          </div>
                        )}
                        <div
                          className="text-gray-700 mb-4"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                        <Link
                          href={`/newsletter/${post.slug}`}
                          className="text-dsa-red font-medium hover:underline"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="bg-white p-8 rounded-lg text-center">
                  <p className="text-lg text-gray-600">No posts found in this category.</p>
                  <Link href="/newsletter" className="mt-4 text-dsa-red hover:underline">
                    View all posts
                  </Link>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/4 mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Categories</h3>
              <NewsletterCategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                postsCount={posts.length}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-4 border-b pb-2">Get Involved</h3>
              <p className="text-gray-700 mb-4">
                Want to contribute to the newsletter or join our communications committee?
              </p>
              <Link href="/contact" className="block text-center btn btn-primary w-full">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
