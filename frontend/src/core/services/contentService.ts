// src/core/services/contentService.ts

// Import all content directly - we'll set up proper imports in the actual code
const pageContent = {
  about: require('../content/pages/about.json'),
  home: require('../content/pages/home.json'),
  join: require('../content/pages/join.json'),
  bylaws: require('../content/pages/bylaws.json'),
  contact: require('../content/pages/contact.json'),
  leadership: require('../content/pages/leadership.json'),
  newsletter: require('../content/pages/newsletter.json'),
  calendar: require('../content/pages/calendar.json'),
  whatWeStandFor: require('../content/pages/what-we-stand-for.json'),
  udYdsa: require('../content/pages/ud-ydsa.json'),
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
