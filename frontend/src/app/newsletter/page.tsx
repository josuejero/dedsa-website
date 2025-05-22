import { contentService } from '@/core/services/contentService';
import type {
  NewsletterPageContent,
  ArticleHeaderContent,
  ArticleFooterContent
} from '@/core/types/pages/newsletter';
import NewsletterFeature from '@/features/newsletter';

export default function NewsletterPage() {
  const data = contentService.getPageContent('newsletter') as
    NewsletterPageContent &
    ArticleHeaderContent &
    ArticleFooterContent;
  return <NewsletterFeature {...data} />;
}
