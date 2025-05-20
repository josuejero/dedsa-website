// src/core/types/shared/index.ts
// Shared types used across the application

export interface BasePageProps {
  className?: string;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkProps {
  href: string;
  label: string;
  external?: boolean;
}
