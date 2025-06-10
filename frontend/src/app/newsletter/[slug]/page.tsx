'use client';

import { Newsletter } from '@/core/types/index';
import ArticleContent from '@/features/newsletter/components/newsletter-article/ArticleContent';
import ArticleFooter from '@/features/newsletter/components/newsletter-article/ArticleFooter';
import ArticleHeader from '@/features/newsletter/components/newsletter-article/ArticleHeader';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageProps {
  params: { slug: string };
}

export default function NewsletterArticlePage({ params }: PageProps) {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNewsletter() {
      try {
        const response = await fetch(`/api/newsletters/${params.slug}`);

        if (response.status === 404) {
          notFound();
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch newsletter');
        }

        const data = await response.json();
        setNewsletter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNewsletter();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container-page">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dsa-red mx-auto"></div>
            <p className="mt-4">Loading newsletter...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container-page">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Error Loading Newsletter
            </h1>
            <p className="mb-4">{error}</p>
            <Link href="/newsletter" className="btn btn-primary">
              Back to Newsletter
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!newsletter) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-24">
      <div className="container-page">
        <article className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <ArticleHeader newsletter={newsletter} />
          <ArticleContent newsletter={newsletter} />
          <ArticleFooter />
        </article>
      </div>
    </div>
  );
}
