import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../types';

interface NewsletterPostListProps {
  posts: Post[];
}

export default function NewsletterPostList({ posts }: NewsletterPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg text-center">
        <p className="text-lg text-gray-600">No posts found in this category.</p>
        <Link href="/newsletter" className="mt-4 text-dsa-red hover:underline">
          View all posts
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.featuredImage?.node && (
            <div className="md:w-1/3 h-48 md:h-auto relative">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
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
        </article>
      ))}
    </div>
  );
}
