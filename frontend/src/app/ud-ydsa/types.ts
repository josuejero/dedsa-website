// types.ts - Shared type definitions for UD YDSA components

export interface SocialMediaLinks {
  instagram: string;
  twitter: string;
  facebook: string;
}

export interface UdYdsaInfo {
  contactEmail: string;
  meetingLocation: string;
  meetingSchedule: string;
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  pageContent: string;
}

export interface SectionProps {
  udYdsaInfo: UdYdsaInfo;
}

export interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  name: string;
}

export interface Event {
  date: string;
  time: string;
  title: string;
  location: string;
  href: string;
}

export interface Campaign {
  title: string;
  description: string;
}

export interface LeadershipMember {
  name: string;
  role: string;
  imageInitials: string;
}

export interface UdYdsaPageProps {
  pageContent: string;
  udYdsaInfo: UdYdsaInfo;
}
