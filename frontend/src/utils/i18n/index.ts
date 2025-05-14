import commonContent from '@/content/common';
import componentContent from '@/content/components';
import pageContent from '@/content/pages';

// Define supported locales
export type Locale = 'en' | 'es';

// Store content by locale
const contentByLocale: Record<
  Locale,
  {
    components: typeof componentContent;
    pages: typeof pageContent;
    common: typeof commonContent;
  }
> = {
  en: {
    components: componentContent,
    pages: pageContent,
    common: commonContent,
  },
  es: {
    components: {}, // Spanish content would go here
    pages: {},
    common: commonContent,
  },
};

// Current locale (could be stored in context or localStorage)
let currentLocale: Locale = 'en';

// Set the current locale
export function setLocale(locale: Locale): void {
  if (Object.keys(contentByLocale).includes(locale)) {
    currentLocale = locale;
  } else {
    console.warn(
      `Locale "${locale}" is not supported. Using default locale "en".`
    );
    currentLocale = 'en';
  }
}

// Get the current locale
export function getLocale(): Locale {
  return currentLocale;
}

// Get content for a specific locale
export function getLocalizedContent(locale: Locale = currentLocale) {
  return contentByLocale[locale] || contentByLocale.en;
}

// Get a localized string path
export function t(path: string, locale: Locale = currentLocale): string {
  const parts = path.split('.');
  if (parts.length < 2) {
    console.warn(`Invalid i18n path: ${path}`);
    return path;
  }

  try {
    const [section, ...keyParts] = parts;
    const localContent = contentByLocale[locale] || contentByLocale.en;

    if (section === 'components') {
      const [componentName, ...componentParts] = keyParts;
      const componentKey = componentParts.join('.');

      // Use type assertion with string index - avoid optional chaining with 'in'
      const componentObj = componentName as string;
      const componentsObj = localContent.components;

      // Check if the component exists
      let component: unknown;
      if (componentObj in componentsObj) {
        // Safely access the component
        component = (componentsObj as Record<string, unknown>)[componentObj];
      }

      // Navigate through nested keys
      if (componentKey && component) {
        let result: Record<string, unknown> = component as Record<
          string,
          unknown
        >;
        for (const k of componentKey.split('.')) {
          if (typeof result !== 'object' || result === null || !(k in result))
            return path;
          result = result[k] as Record<string, unknown>;
        }
        return String(result);
      }
    } else if (section === 'pages') {
      const [pageName, ...pageParts] = keyParts;
      const pageKey = pageParts.join('.');

      // Use string index directly to avoid shadowing imported pageContent
      const pageObj = pageName as string;
      const pagesObj = localContent.pages;

      // Safely access page content
      let pageContentData: unknown;
      if (pageObj in pagesObj) {
        const page = (pagesObj as Record<string, { content?: unknown }>)[
          pageObj
        ];
        pageContentData = page?.content;
      }

      // Navigate through nested keys
      if (pageKey && pageContentData) {
        let result: Record<string, unknown> = pageContentData as Record<
          string,
          unknown
        >;
        for (const k of pageKey.split('.')) {
          if (typeof result !== 'object' || result === null || !(k in result))
            return path;
          result = result[k] as Record<string, unknown>;
        }
        return String(result);
      }
    } else if (section === 'common') {
      // Use a separate variable name to avoid confusion
      const commonKey = keyParts[0] as string;
      const commonObj = localContent.common;

      // Safe check if the common key exists
      const isValidKey = commonKey in commonObj;

      if (!commonKey || !isValidKey) {
        return path;
      }

      // Use type assertion to access the content safely
      const contentValue = (commonObj as unknown as Record<string, unknown>)[
        commonKey
      ];

      // Navigate through nested keys
      if (
        contentValue &&
        typeof contentValue === 'object' &&
        keyParts.length > 1
      ) {
        let result: Record<string, unknown> = contentValue as Record<
          string,
          unknown
        >;
        for (const k of keyParts.slice(1).join('.').split('.')) {
          if (typeof result !== 'object' || result === null || !(k in result))
            return path;
          result = result[k] as Record<string, unknown>;
        }
        return String(result);
      } else if (contentValue) {
        return String(contentValue);
      }
    }

    return path;
  } catch (error) {
    console.error(`Error resolving i18n path: ${path}`, error);
    return path;
  }
}
