import { Newsletter } from '@/core/types/index';
import Link from 'next/link';

interface ArticleHeaderProps {
  newsletter: Newsletter;
}

export default function ArticleHeader({ newsletter }: ArticleHeaderProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <Link
          href="/newsletter"
          className="inline-flex items-center text-dsa-red hover:underline"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          ← Back to Newsletter
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">{newsletter.title}</h1>

      <div className="flex items-center text-gray-600 mb-4">
        <time dateTime={newsletter.date}>
          {new Date(newsletter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>

        {newsletter.author?.node?.name && (
          <>
            <span className="mx-2">•</span>
            <span>By {newsletter.author.node.name}</span>
          </>
        )}
      </div>
    </div>
  );
}
