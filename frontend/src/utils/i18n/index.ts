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
    common: {},
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
    const key = keyParts.join('.');

    let content;
    if (section === 'components') {
      const [componentName, ...componentParts] = keyParts;
      const componentKey = componentParts.join('.');
      content = contentByLocale[locale]?.components[componentName];

      // Navigate through nested keys
      if (componentKey && content) {
        let result = content;
        for (const k of componentKey.split('.')) {
          if (result[k] === undefined) return path;
          result = result[k] as any;
        }
        return String(result);
      }
    } else if (section === 'pages') {
      const [pageName, ...pageParts] = keyParts;
      const pageKey = pageParts.join('.');
      content = contentByLocale[locale]?.pages[pageName]?.content;

      // Navigate through nested keys
      if (pageKey && content) {
        let result = content;
        for (const k of pageKey.split('.')) {
          if (result[k] === undefined) return path;
          result = result[k] as any;
        }
        return String(result);
      }
    } else if (section === 'common') {
      content = contentByLocale[locale]?.common[keyParts[0]] as any;

      // Navigate through nested keys
      if (content && keyParts.length > 1) {
        let result = content;
        for (const k of keyParts.slice(1).join('.').split('.')) {
          if (result[k] === undefined) return path;
          result = result[k] as any;
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
