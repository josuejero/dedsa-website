import React from 'react';
import Link from 'next/link';
import { Category } from '../types';
import NewsletterCategoryFilter from '../NewsletterCategoryFilter';

interface NewsletterSidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  postsCount: number;
}

export default function NewsletterSidebar({
  categories,
  selectedCategory,
  postsCount,
}: NewsletterSidebarProps) {
  return (
    <aside className="lg:w-1/4 mt-8 lg:mt-0">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Categories</h3>
        <NewsletterCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          postsCount={postsCount}
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
  );
}
