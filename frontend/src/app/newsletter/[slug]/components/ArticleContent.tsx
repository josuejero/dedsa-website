import React from 'react';
import Link from 'next/link';
import { Post } from '../types';

export default function ArticleContent({ post }: { post: Post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            {post.author?.avatar?.url ? (
              <img
                src={post.author.avatar.url}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-dsa-red text-white font-bold">
                {post.author?.name?.charAt(0) || 'D'}
              </div>
            )}
          </div>

          <div className="ml-3">
            <p className="font-medium">{post.author?.name || 'Delaware DSA'}</p>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>

        {post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap mb-8">
            {post.categories.nodes.map((cat) => (
              <Link
                key={cat.id}
                href={`/newsletter?category=${cat.slug}`}
                className="mr-2 mb-2 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        )}

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
