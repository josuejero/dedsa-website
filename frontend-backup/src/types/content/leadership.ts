export interface LeadershipPageContent {
  title: string;
  introContent: string;
  fallbackContent: string;
}

export interface LeadershipRole {
  id: string;
  title: string;
  name: string;
  bio: string;
  email: string;
  imageUrl?: string;
  order: number;
}

export interface LeadershipPageData {
  page?: { content?: string | null };
  leadership?: {
    nodes: Array<{
      id: string;
      title: string;
      content: string;
      leadership: { role: string; email: string; order: number };
      featuredImage?: { node: { sourceUrl: string } };
    }>;
  };
}

export interface ChapterStructureContent {
  title: string;
  description: string;
  structureItems: Record<string, { title: string; description: string }>;
  meetingsInfo: string;
  bylawsLinkText: string;
  bylawsLinkHref: string;
}

export interface LeadershipCardContent {
  roleDefault: string;
  nameDefault: string;
  bioDefault: string;
  emailDefault: string;
}
