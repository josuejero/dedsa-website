const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const config = {
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',

  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://delawardsa.org',
  wordpressUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '/graphql',

  email: {
    domain: getEnvVar('NEXT_PUBLIC_EMAIL_DOMAIN')
  },

  seo: {
    siteName: 'Delaware DSA',
    titleTemplate: '%s | Delaware DSA',
    defaultDescription:
      'Official website of the Delaware chapter of the Democratic Socialists of America.'
  }
} as const;

export type Config = typeof config;
