import { contentService } from '@/core/services/contentService';
import type {
  ArticleFooterContent,
  ArticleHeaderContent,
  NewsletterPageContent,
} from '@/core/types/pages/newsletter';
import NewsletterFeature from '@/features/newsletter';

export default function NewsletterPage() {
  const data = contentService.getPageContent(
    'newsletter'
  ) as unknown as NewsletterPageContent &
    ArticleHeaderContent &
    ArticleFooterContent;
  return <NewsletterFeature {...data} />;
}
