import { Newsletter } from '@/core/types/index';

interface ArticleContentProps {
  newsletter: Newsletter;
}

export default function ArticleContent({ newsletter }: ArticleContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <div
        dangerouslySetInnerHTML={{ __html: newsletter.content || '' }}
        className="newsletter-content"
      />
    </div>
  );
}
