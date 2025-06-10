// src/core/services/contentService.ts
import footer from '../content/components/footer.json';
import header from '../content/components/header.json';
import newsletterSignup from '../content/components/newsletterSignup.json';
import about from '../content/pages/about.json';
import bylaws from '../content/pages/bylaws.json';
import calendar from '../content/pages/calendar.json';
import contact from '../content/pages/contact.json';
import home from '../content/pages/home.json';
import join from '../content/pages/join.json';
import leadership from '../content/pages/leadership.json';
import newsletter from '../content/pages/newsletter.json';
import udYdsa from '../content/pages/ud-ydsa.json';
import whatWeStandFor from '../content/pages/what-we-stand-for.json';

// Import all content directly
const pageContent = {
  about,
  home,
  join,
  calendar,
  contact,
  leadership,
  newsletter,
  bylaws,
  whatWeStandFor,
  udYdsa,
};

const componentContent = {
  header,
  footer,
  newsletterSignup,
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
};
