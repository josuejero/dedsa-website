import commonContent from '@/content/common';
import componentContent from '@/content/components';
import pageContent from '@/content/pages';
import { CommonContent } from '@/types/content';

// Define supported locales
export type Locale = 'en' | 'es';

// Store content by locale
const contentByLocale: Record
  Locale,
  {
    components: typeof componentContent;
    pages: typeof pageContent;
    common: CommonContent;
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
    common: commonContent, // Using English content as fallback
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
    const keyPath = keyParts.join('.');

    if (section === 'components') {
      const [componentName, ...componentParts] = keyParts;
      const componentKeyPath = componentParts.join('.');
      const componentContent = contentByLocale[locale]?.components[componentName as keyof typeof componentContent];

      // Navigate through nested keys
      if (componentKeyPath && componentContent) {
        let result: Record<string, unknown> = componentContent;
        for (const k of componentKeyPath.split('.')) {
          if (typeof result !== 'object' || result === null || !(k in result)) return path;
          result = result[k] as Record<string, unknown>;
        }
        return String(result);
      }
    } else if (section === 'pages') {
      const [pageName, ...pageParts] = keyParts;
      const pageKeyPath = pageParts.join('.');
      const pageContent = contentByLocale[locale]?.pages[pageName as keyof typeof pageContent]?.content;

      // Navigate through nested keys
      if (pageKeyPath && pageContent) {
        let result: Record<string, unknown> = pageContent;
        for (const k of pageKeyPath.split('.')) {
          if (typeof result !== 'object' || result === null || !(k in result)) return path;
          result = result[k] as Record<string, unknown>;
        }
        return String(result);
      }
    } else if (section === 'common') {
      const firstKey = keyParts[0] as keyof CommonContent;
      if (!firstKey || !(firstKey in (contentByLocale[locale]?.common || {}))) {
        return path;
      }
      
      let content = contentByLocale[locale]?.common[firstKey] as Record<string, unknown>;

      // Navigate through nested keys
      if (content && keyParts.length > 1) {
        let result = content;
        for (const k of keyParts.slice(1).join('.').split('.')) {
          if (typeof result !== 'object' || result === null || !(k in result)) return path;
          result = result[k] as Record<string, unknown>;
        }
        return String(result);
      }
    }

    return path;
  } catch (error) {
    console.error(`Error resolving i18n path: ${path}`, error);
    return path;
  }
}
