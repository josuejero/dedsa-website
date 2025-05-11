import Image from 'next/image';
import Link from 'next/link';

import { LatestUpdatesSectionProps } from '../types';

export default function LatestUpdatesSection({
  posts,
}: LatestUpdatesSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <h2 className="text-3xl font-bold mb-2">Latest Updates</h2>
        <div className="w-20 h-1 bg-dsa-red mb-10 rounded"></div>

        <div className="space-y-8" data-testid="latest-updates-section">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 mt-4">Loading recent posts...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  {post.featuredImage?.node ? (
                    <div className="h-48 overflow-hidden">
                      <Image
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        width={400}
                        height={300}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-r from-red-100 to-red-200 flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-dsa-red opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-dsa-red transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 flex items-center">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      {post.author?.node?.name && (
                        <>
                          <span className="mx-2">|</span>
                          <svg
                            className="w-4 h-4 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {post.author.node.name}
                        </>
                      )}
                    </p>
                    <div
                      className="text-gray-700 mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <Link
                      href={`/newsletter/${post.slug}`}
                      className="inline-flex items-center text-dsa-red font-medium hover:underline group"
                    >
                      Read more
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/newsletter"
            className="btn btn-primary shadow-md hover:shadow-lg transform hover:translate-y-px transition-all"
          >
            View All Updates
          </Link>
        </div>
      </div>
    </section>
  );
}
