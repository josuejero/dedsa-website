export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
  excerpt?: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText?: string;
    };
  } | null;
  author?: {
    node?: {
      name: string;
      avatar?: {
        url: string;
      } | null;
    };
  } | null;
  categories?: {
    nodes: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  } | null;
}

export interface Leadership {
  id: string;
  title: string;
  excerpt?: string;
  content: string;
  leadership: {
    role: string;
    email: string;
    order: number;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
    };
  };
}

export interface Position {
  id: string;
  title: string;
  content: string;
  menuOrder: number;
}

export interface Page {
  content: string;
  title?: string;
  slug?: string;
}

export interface MetaData {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
  };
}
