import { Post } from '../types';

export default function ArticleContent({ post }: { post: Post }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
