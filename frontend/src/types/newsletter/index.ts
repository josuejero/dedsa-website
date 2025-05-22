// src/types/newsletter/index.ts
export interface Newsletter {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
  author?: {
    node: {
      name: string;
    };
  };
  content?: string;
  fullContentPath?: string;
}
