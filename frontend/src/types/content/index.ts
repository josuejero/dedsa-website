// Type definitions for content files

// Basic content item with text fields
export interface ContentItem {
  [key: string]: string | ContentItem | ContentItem[] | undefined;
}

// Component content schema
export interface ComponentContent {
  [componentName: string]: ContentItem;
}

// Page content schema
export interface PageContent {
  [pageName: string]: {
    meta?: {
      title?: string;
      description?: string;
    };
    content: ContentItem;
  };
}

// Common/shared content schema
export interface CommonContent {
  navigation: {
    items: Array<{
      name: string;
      href: string;
    }>;
  };
  cta: {
    join: string;
    newsletter: string;
    events: string;
  };
  footer: {
    copyright: string;
    links: {
      [category: string]: Array<{
        name: string;
        href: string;
      }>;
    };
  };
}
