import Link from 'next/link';
import { Post, RelatedPost } from '../types';

export default function ArticleFooter({
  relatedPosts
}: {
  post: Post;
  relatedPosts: RelatedPost[];
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
      {relatedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedPosts.map((relatedPost) => (
            <Link
              key={relatedPost.id}
              href={`/newsletter/${relatedPost.slug}`}
              className="p-4 border rounded hover:bg-gray-50"
            >
              <h3 className="font-medium">{relatedPost.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(relatedPost.date).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No related articles found</p>
      )}
    </div>
  );
}
