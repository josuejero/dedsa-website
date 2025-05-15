import Link from 'next/link';
import articleHeaderContent from '../../../../content/newsletter/articleHeader.json';
import { ArticleHeaderContent } from '../../../../types/content/newsletter';
import { Post } from '../types';

// Type assertion for imported JSON
const typedContent = articleHeaderContent as ArticleHeaderContent;

export default function ArticleHeader({ post }: { post: Post }) {
  return (
    <div className="mb-8">
      <nav className="mb-4">
        <Link href="/newsletter" className="text-dsa-red hover:underline">
          {typedContent.backToNewsletterText}
        </Link>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
}
