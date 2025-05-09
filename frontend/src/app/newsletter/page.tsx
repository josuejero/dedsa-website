import { Metadata } from 'next';
import { getClient } from '../../lib/apollo-client';
import NewsletterHeader from './components/NewsletterHeader';
import NewsletterLayout from './components/NewsletterLayout';
import { GET_POSTS_AND_CATEGORIES } from './queries';
import { Post } from './types';

export const metadata: Metadata = {
  title: 'Newsletter',
  description:
    'Latest news, updates, and articles from the Delaware chapter of the Democratic Socialists of America.',
};

// Fixed: Remove Promise wrapper from searchParams
export default async function Newsletter({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // No need to await searchParams anymore
  const selectedCategory = searchParams.category || null;

  const { data } = await getClient().query({
    query: GET_POSTS_AND_CATEGORIES,
  });

  const posts = data?.posts?.nodes || [];
  const categories = data?.categories?.nodes || [];

  const filteredPosts = selectedCategory
    ? posts.filter((post: unknown) =>
        (post as Post).categories.nodes.some(
          (cat: { slug: string }) => cat.slug === selectedCategory,
        ),
      )
    : posts;

  return (
    <div className="bg-gray-100 py-8">
      <div className="container-page">
        <NewsletterHeader />

        <NewsletterLayout
          posts={filteredPosts}
          categories={categories}
          selectedCategory={selectedCategory}
          postsCount={posts.length}
        />
      </div>
    </div>
  );
}
