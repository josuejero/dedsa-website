export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Newsletter', href: '/newsletter' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' }
] as const;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/DelawareDSA',
  facebook: 'https://www.facebook.com/DelawareDSA',
  instagram: 'https://www.instagram.com/delawareDSA'
} as const;

export const PAGINATION = {
  POSTS_PER_PAGE: 9,
  EVENTS_PER_PAGE: 6
} as const;

export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 }
} as const;

export const DATE_FORMATS = {
  default: 'MMMM d, yyyy',
  compact: 'MM/dd/yyyy',
  withTime: 'MMMM d, yyyy h:mm a'
} as const;
