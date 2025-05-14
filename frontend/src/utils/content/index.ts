import componentContent from '@/content/components';
import pageContent from '@/content/pages';
<<<<<<< HEAD
<<<<<<< HEAD
import { ContentItem } from '@/types/content';
=======
import { CommonContent, ContentItem } from '@/types/content';
import commonContent from '/content/common';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 73395ad (update)
=======
>>>>>>> parent of 73395ad (update)
=======
>>>>>>> parent of 73395ad (update)
=======
import { CommonContent, ContentItem } from '@/types/content';
>>>>>>> parent of db8fd55 (update)

// Utility to get content by component name and key
export function getComponentContent<T = ContentItem>(
  componentName: string,
  key?: string
): T {
  if (!componentName) {
    throw new Error('Component name is required');
  }

  // Get component content object
  const content =
    componentContent[componentName as keyof typeof componentContent];
  if (!content) {
    console.warn(`No content found for component: ${componentName}`);
    return {} as T;
  }

  // Return specific key or entire component content
  if (key && typeof content === 'object' && key in content) {
    return content[key as keyof typeof content] as unknown as T;
  }

  return content as unknown as T;
}

// Utility to get page content
export function getPageContent<T = ContentItem>(
  pageName: string,
  key?: string
): T {
  if (!pageName) {
    throw new Error('Page name is required');
  }

  const content = pageContent[pageName as keyof typeof pageContent];
  if (!content) {
    console.warn(`No content found for page: ${pageName}`);
    return {} as T;
  }

  if (key && typeof content.content === 'object' && key in content.content) {
    return content.content[key as keyof typeof content.content] as unknown as T;
  }

  return content.content as unknown as T;
}

// Utility to get common content
export function getCommonContent<T = ContentItem>(
  section: keyof CommonContent,
  key?: string
): T {
  if (!section) {
    throw new Error('Section is required');
  }

  const content = commonContent[section];
  if (!content) {
    console.warn(`No content found for common section: ${section}`);
    return {} as T;
  }

<<<<<<< HEAD
<<<<<<< HEAD
  if (key && typeof content === 'object' && key in content) {
=======
  if (key && key in content) {
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 73395ad (update)
=======
>>>>>>> parent of 73395ad (update)
=======
>>>>>>> parent of 73395ad (update)
    return content[key] as unknown as T;
=======
  if (
    key &&
    typeof content === 'object' &&
    key in (content as Record<string, unknown>)
  ) {
    return (content as Record<string, unknown>)[key] as unknown as T;
>>>>>>> parent of db8fd55 (update)
  }

  return content as unknown as T;
}

// Get page metadata
export function getPageMeta(pageName: string): {
  title?: string;
  description?: string;
} {
  if (!pageName) {
    throw new Error('Page name is required');
  }

  const content = pageContent[pageName as keyof typeof pageContent];
  if (!content || !content.meta) {
    return {};
  }

  return content.meta;
}

// Create React hook for component content
export function useComponentContent<T = ContentItem>(
  componentName: string,
  key?: string
): T {
  return getComponentContent<T>(componentName, key);
}

// Create React hook for page content
export function usePageContent<T = ContentItem>(
  pageName: string,
  key?: string
): T {
  return getPageContent<T>(pageName, key);
}

// Create React hook for common content
export function useCommonContent<T = ContentItem>(
  section: keyof CommonContent,
  key?: string
): T {
  return getCommonContent<T>(section, key);
}
