// src/core/types/layout/index.ts

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
  icon: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  organizationName: string;
  organizationDescription: string;
  copyright: string;
  privacyPolicy: string;
  socialLinks: SocialLink[];
  sections: FooterSection[];
}
