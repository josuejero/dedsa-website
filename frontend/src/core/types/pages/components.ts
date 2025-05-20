// frontend/src/types/content/components.ts

export interface NavItem {
  name: string;
  href: string;
}

export interface HeaderContent {
  siteName: string;
  joinButtonText: string;
  navItems: NavItem[];
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'twitter' | 'facebook' | 'instagram';
}

export interface FooterSection {
  title: string;
  links: { name: string; href: string }[];
}

export interface FooterContent {
  organizationName: string;
  organizationDescription: string;
  copyright: string;
  privacyPolicy: string;
  socialLinks: SocialLink[];
  sections: FooterSection[];
}

export interface NewsletterVariant {
  title: string;
  description: string;
}

export interface NewsletterSignupContent {
  variants: {
    banner: NewsletterVariant;
    sidebar: NewsletterVariant;
    footer: NewsletterVariant;
  };
  inputPlaceholder: string;
  buttonText: string;
  loadingText: string;
  success: {
    title: string;
    message: string;
    buttonText: string;
  };
  error: {
    defaultMessage: string;
    networkError: string;
  };
}
