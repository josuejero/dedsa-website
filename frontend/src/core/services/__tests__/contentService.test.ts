import { contentService } from '../contentService';

describe('contentService', () => {
  describe('getPageContent', () => {
    it('returns content for valid page names', () => {
      const homeContent = contentService.getPageContent('home');
      expect(homeContent).toHaveProperty('heroSection');
      expect(homeContent).toHaveProperty('missionSection');

      const aboutContent = contentService.getPageContent('about');
      expect(aboutContent).toHaveProperty('aboutHero');
      expect(aboutContent).toHaveProperty('achievements');
    });

    it('returns undefined for invalid page names', () => {
      const content = contentService.getPageContent('invalid' as any);
      expect(content).toBeUndefined();
    });
  });

  describe('getComponentContent', () => {
    it('returns header content', () => {
      const header = contentService.getComponentContent('header') as any;
      expect(header).toHaveProperty('siteName');
      expect(header).toHaveProperty('navItems');
      expect(header.siteName).toBe('Delaware DSA');
    });

    it('returns footer content', () => {
      const footer = contentService.getComponentContent('footer') as any;
      expect(footer).toHaveProperty('organizationName');
      expect(footer).toHaveProperty('socialLinks');
      expect(footer).toHaveProperty('sections');
    });
  });
});
