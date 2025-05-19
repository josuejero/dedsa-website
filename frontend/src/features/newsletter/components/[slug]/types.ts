export interface Author {
  id: string;
  name: string;
  slug: string;
  avatar: {
    url: string;
  } | null;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  slug: string;
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
  author: Author;
}

export interface RelatedPost {
  id: string;
  title: string;
  slug: string;
  date: string;
}
