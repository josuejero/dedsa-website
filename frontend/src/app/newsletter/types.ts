export interface Post {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}
