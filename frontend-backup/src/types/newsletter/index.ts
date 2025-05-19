export interface Newsletter {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  content: string;
  fullContentPath: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  };
  author?: {
    node?: {
      name: string;
    };
  };
}
