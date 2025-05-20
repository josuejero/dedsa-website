// src/core/services/contentService.ts

// Import all content directly
const pageContent = {
  about: require('../content/pages/about.json'),
  home: require('../content/pages/home.json'),
  join: require('../content/pages/join.json'),
};

const componentContent = {
  header: require('../content/components/header.json'),
  footer: require('../content/components/footer.json'),
  newsletterSignup: require('../content/components/newsletterSignup.json'),
};

const sharedContent = {
  newsletters: require('../content/shared/newsletters.json'),
};

export const contentService = {
  /**
   * Get content for a specific page
   */
  getPageContent: (pageName: keyof typeof pageContent) => {
    return pageContent[pageName];
  },

  /**
   * Get content for a specific component
   */
  getComponentContent: (componentName: keyof typeof componentContent) => {
    return componentContent[componentName];
  },

  /**
   * Get shared content
   */
  getSharedContent: (contentName: keyof typeof sharedContent) => {
    return sharedContent[contentName];
  },
};
