// frontend/src/components/types/index.ts
import { IMAGE_SIZES } from '@/constants';
import React from 'react';

// Error display types
export interface ErrorDisplayProps {
  title?: string;
  message?: string;
  error?: Error | unknown;
  showDetails?: boolean;
  actionLabel?: string;
  actionHref?: string;
}

// Loading component types
export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

// Button component types
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
}

// OptimizedImage component types
export interface OptimizedImageProps {
  src: string;
  alt: string;
  size?: keyof typeof IMAGE_SIZES;
  className?: string;
  priority?: boolean;
}

// Latest updates section types
export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  featuredImage?: {
    node?: {
      sourceUrl: string;
      altText: string;
    };
  };
  author?: {
    node?: {
      name: string;
    };
  };
}

export interface LatestUpdatesSectionProps {
  posts: Post[];
}

// ContactForm types
export interface ContactFormProps {
  initialSubject?: string;
}

// NewsletterSignup types
export interface NewsletterSignupProps {
  variant?: 'banner' | 'sidebar' | 'footer';
  title?: string;
  description?: string;
}
