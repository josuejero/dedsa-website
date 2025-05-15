export interface NewsletterPageContent {
  title: string;
  noPostsMessage: string;
  errorTitle: string;
  errorMessage: string;
  errorActionLabel: string;
}

export interface ArticleHeaderContent {
  backToNewsletterText: string;
}

export interface ArticleContentContent {
  // No text content needed as it's just a wrapper
}

export interface ArticleFooterContent {
  relatedArticlesTitle: string;
  noRelatedArticlesMessage: string;
}
