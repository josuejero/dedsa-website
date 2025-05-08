import React from 'react';
import Link from 'next/link';
import { Post } from '../types';

export default function ArticleHeader({ post }: { post: Post }) {
  return (
    <>
      <nav className="mb-8">
        <ol className="flex text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-dsa-red">
              Home
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link href="/newsletter" className="hover:text-dsa-red">
              Newsletter
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900 font-medium truncate">{post.title}</li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {post.featuredImage?.node && (
          <div className="w-full h-96">
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </>
  );
}
