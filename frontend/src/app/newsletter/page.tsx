import React from 'react';
import { getClient } from '../../lib/apollo-client';
import { Metadata } from 'next';
import { GET_POSTS_AND_CATEGORIES } from './queries';
import NewsletterHeader from './components/NewsletterHeader';
import NewsletterLayout from './components/NewsletterLayout';
import { Post } from './types';

export const metadata: Metadata = {
  title: 'Newsletter',
  description:
    'Latest news, updates, and articles from the Delaware chapter of the Democratic Socialists of America.',
};

export default async function Newsletter({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams.category || null;

  const { data } = await getClient().query({
    query: GET_POSTS_AND_CATEGORIES,
  });

  const posts = data?.posts?.nodes || [];
  const categories = data?.categories?.nodes || [];

  const filteredPosts = selectedCategory
    ? posts.filter((post: unknown) =>
        (post as Post).categories.nodes.some((cat: any) => cat.slug === selectedCategory),
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
