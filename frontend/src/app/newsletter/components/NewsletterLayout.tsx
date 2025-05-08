import React from 'react';
import { Post, Category } from '../types';
import NewsletterSidebar from './NewsletterSidebar';
import NewsletterPostList from './NewsletterPostList';

interface NewsletterLayoutProps {
  posts: Post[];
  categories: Category[];
  selectedCategory: string | null;
  postsCount: number;
}

export default function NewsletterLayout({
  posts,
  categories,
  selectedCategory,
  postsCount,
}: NewsletterLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      <main className="lg:w-3/4 lg:pr-8">
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

        <NewsletterPostList posts={posts} />
      </main>

      <NewsletterSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        postsCount={postsCount}
      />
    </div>
  );
}
