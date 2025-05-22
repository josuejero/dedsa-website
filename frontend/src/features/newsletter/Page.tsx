import type { NewsletterPageContent, ArticleHeaderContent, ArticleFooterContent } from '@/core/types/pages/newsletter';
type Props = NewsletterPageContent & ArticleHeaderContent & ArticleFooterContent;
export default function NewsletterPage(props: Props) {
  // TODO: render the newsletter page using props.noPostsMessage, props.articleHeader, props.articleFooter, etc.
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}
