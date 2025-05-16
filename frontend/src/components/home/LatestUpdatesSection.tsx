'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LatestUpdatesSection() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsletters() {
      try {
        const response = await fetch('/api/newsletters');
        if (!response.ok) {
          throw new Error('Failed to fetch newsletters');
        }
        const data = await response.json();
        setNewsletters(data);
      } catch (err) {
        console.error('Error fetching newsletters:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNewsletters();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading latest updates...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading updates: {error}
      </div>
    );

  return (
    <section className="py-20 bg-white">
      <div className="container-page">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-heading">
            LATEST FROM THE DELAWARE ROSE GARDEN
          </h2>
          <div className="w-24 h-1 bg-dsa-red mx-auto mb-4 rounded"></div>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            News and updates from our chapter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsletters.map((newsletter) => (
            <article
              key={newsletter.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {newsletter.featuredImage?.node ? (
                <div className="h-48 overflow-hidden">
                  <Image
                    src={newsletter.featuredImage.node.sourceUrl}
                    alt={
                      newsletter.featuredImage.node.altText || newsletter.title
                    }
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
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
                <h3 className="text-xl font-bold mb-2 line-clamp-2 text-card-title group-hover:text-dsa-red transition-colors">
                  {newsletter.title}
                </h3>
                <p className="text-muted text-sm mb-3 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(newsletter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {newsletter.author?.node?.name && (
                    <>
                      <span className="mx-2">|</span>
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {newsletter.author.node.name}
                    </>
                  )}
                </p>
                <div className="text-card-body mb-4 line-clamp-3 overflow-hidden">
                  {newsletter.excerpt}
                </div>
                <div>
                  <Link
                    href={`/newsletter/${newsletter.slug}`}
                    className="inline-flex items-center text-link font-medium hover:underline group"
                  >
                    Read more
                    <svg
                      className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/newsletter"
            className="btn btn-primary shadow-lg hover:shadow-xl transform hover:translate-y-px transition-all px-8 py-3 text-lg"
          >
            READ ALL UPDATES
          </Link>
        </div>
      </div>
    </section>
  );
}
