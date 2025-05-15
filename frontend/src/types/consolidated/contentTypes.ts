// Base types that can be reused across content areas
export interface BasePageContent {
  title: string;
  fallbackContent: string;
}

export interface LinkItem {
  text: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

// Consolidated content types
export interface PageContent extends BasePageContent {
  seo?: {
    title?: string;
    description?: string;
  };
  sections?: Record<string, unknown>;
}

// More generic section types
export interface HeroSection {
  heading: string;
  subheading?: string;
  description?: string;
  buttons?: {
    primary?: LinkItem;
    secondary?: LinkItem;
  };
}

export interface CardSection {
  heading: string;
  subheading?: string;
  items: Array<{
    title: string;
    description: string;
    icon?: string;
    link?: LinkItem;
  }>;
  cta?: LinkItem;
}

// Add more consolidated types as needed...
