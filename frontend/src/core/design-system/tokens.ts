export const DesignTokens = {
  // Colors
  colors: {
    primary: '#EC1F27',
    primaryTints: ['#F04C53', '#F4797E', '#F7A5A9', '#FBD2D4'],
    black: '#231F20',
    blackTints: ['#514D4E', '#7F7B7C', '#ADA9AA', '#DBD7D8'],
    cream: '#FFF3F5',
    // Accessibility pairs
    accessible: {
      redOnWhite: { bg: '#FFFFFF', text: '#EC1F27', ratio: 4.5 },
      whiteOnRed: { bg: '#EC1F27', text: '#FFFFFF', ratio: 8.6 },
      blackOnCream: { bg: '#FFF3F5', text: '#231F20', ratio: 18.9 },
    },
  },

  // Typography
  typography: {
    fontFamilies: {
      primary: 'Manifold DSA, Klima, -apple-system, sans-serif',
      heading: 'Styrene B, Manifold DSA Black, sans-serif',
      longForm: 'Roboto Slab, Georgia, serif',
    },
    scale: {
      '4xl': { size: '4rem', lineHeight: 1.1, tracking: '-0.02em' },
      '3xl': { size: '3rem', lineHeight: 1.2, tracking: '-0.01em' },
      '2xl': { size: '2.25rem', lineHeight: 1.3, tracking: '0' },
      xl: { size: '1.75rem', lineHeight: 1.4, tracking: '0' },
      lg: { size: '1.25rem', lineHeight: 1.5, tracking: '0' },
      base: { size: '1rem', lineHeight: 1.6, tracking: '0' },
      sm: { size: '0.875rem', lineHeight: 1.5, tracking: '0.08em' },
    },
  },

  // Spacing (based on 8px grid)
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },

  // Layout
  layout: {
    maxWidth: '1280px',
    gutter: '1.5rem',
    logoRatio: { top: 5, logo: 13, bottom: 2 },
  },
};
