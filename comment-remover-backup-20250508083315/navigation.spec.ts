/**
 * Navigation E2E tests
 *
 * Tests the site-wide navigation functionality, including:
 * - Header navigation
 * - Footer navigation
 * - Mobile responsiveness
 * - Navigation between key sections
 */

describe('Site Navigation', () => {
  beforeEach(() => {
    // Start at the home page
    cy.visit('/');

    // Wait for page to load
    cy.get('header').should('be.visible');
  });

  describe('Desktop Navigation', () => {
    beforeEach(() => {
      // Ensure viewport is desktop size
      cy.viewport(1280, 800);
    });

    it('should display all primary navigation items in the header', () => {
      cy.get('header').within(() => {
        // Check logo/home link
        cy.get('a[href="/"]').should('be.visible');

        // Check primary nav items
        const expectedNavItems = [
          { name: 'Newsletter', href: '/newsletter' },
          { name: 'What We Stand For', href: '/what-we-stand-for' },
          { name: 'Calendar', href: '/calendar' },
          { name: 'Leadership', href: '/leadership' },
          { name: 'Committees', href: '/committees' },
          { name: 'Bylaws', href: '/bylaws' },
          { name: 'Contact', href: '/contact' },
          { name: 'UD YDSA', href: '/ud-ydsa' },
        ];

        expectedNavItems.forEach((item) => {
          cy.contains('a', item.name).should('be.visible').should('have.attr', 'href', item.href);
        });

        // Check join button
        cy.contains('a', 'Join Our Chapter')
          .should('be.visible')
          .should('have.attr', 'href', '/join');
      });
    });

    it('should navigate to correct pages when clicking header links', () => {
      // Test a few key navigation items
      cy.contains('a', 'Newsletter').click();
      cy.url().should('include', '/newsletter');
      cy.get('h1').contains('Newsletter').should('be.visible');

      cy.contains('a', 'Calendar').click();
      cy.url().should('include', '/calendar');
      cy.get('h1').contains('Events Calendar').should('be.visible');

      cy.contains('a', 'What We Stand For').click();
      cy.url().should('include', '/what-we-stand-for');
      cy.get('h1').contains('What We Stand For').should('be.visible');
    });

    it('should display and navigate through footer links', () => {
      // Scroll to footer
      cy.get('footer').scrollIntoView().should('be.visible');

      // Check footer sections
      cy.get('footer').within(() => {
        // Check section headings
        cy.contains('Learn').should('be.visible');
        cy.contains('Get Involved').should('be.visible');
        cy.contains('Resources').should('be.visible');

        // Test navigation for a few links
        cy.contains('a', 'About Us').click();
      });

      // Verify navigation worked
      cy.url().should('include', '/about');
      cy.get('h1').contains('About Delaware DSA').should('be.visible');

      // Go back to home and test another footer link
      cy.visit('/');
      cy.get('footer').scrollIntoView();

      cy.get('footer').within(() => {
        cy.contains('a', 'Committees').click();
      });

      // Verify navigation
      cy.url().should('include', '/committees');
      cy.get('h1').contains('Committees & Working Groups').should('be.visible');
    });

    it('should return to homepage when clicking the logo', () => {
      // First navigate to a different page
      cy.contains('a', 'Contact').click();
      cy.url().should('include', '/contact');

      // Click logo to return home
      cy.get('header').find('a[href="/"]').first().click();

      // Verify return to homepage
      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h1').contains('Delaware DSA').should('be.visible');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      // Set viewport to mobile size
      cy.viewport('iphone-8');
    });

    it('should display mobile menu button and toggle navigation', () => {
      // Mobile navigation should be hidden initially
      cy.get('header').within(() => {
        // Logo should be visible
        cy.get('a[href="/"]').should('be.visible');

        // Menu items should not be visible
        cy.contains('a', 'Newsletter').should('not.be.visible');

        // Mobile menu button should be visible
        cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]')
          .should('be.visible')
          .as('menuButton');

        // Click menu button to open navigation
        cy.get('@menuButton').click();

        // Navigation should now be visible
        cy.contains('a', 'Newsletter').should('be.visible');
        cy.contains('a', 'Calendar').should('be.visible');
        cy.contains('a', 'What We Stand For').should('be.visible');

        // Close menu
        cy.get('@menuButton').click();

        // Navigation should be hidden again
        cy.contains('a', 'Newsletter').should('not.be.visible');
      });
    });

    it('should navigate to correct pages when using mobile menu', () => {
      // Open mobile menu
      cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]').click();

      // Click a navigation item
      cy.contains('a', 'Calendar').click();

      // Verify navigation worked
      cy.url().should('include', '/calendar');
      cy.get('h1').contains('Events Calendar').should('be.visible');

      // Mobile menu should close after navigation
      cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]').should(
        'be.visible',
      );
      cy.contains('a', 'Newsletter').should('not.be.visible');
    });

    it('should display the join button in mobile menu', () => {
      // Open mobile menu
      cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]').click();

      // Join button should be visible in mobile menu
      cy.contains('a', 'Join Our Chapter')
        .should('be.visible')
        .should('have.attr', 'href', '/join');

      // Test navigation to Join page
      cy.contains('a', 'Join Our Chapter').click();

      // Verify navigation worked
      cy.url().should('include', '/join');
      cy.get('h1').contains('Join Delaware DSA').should('be.visible');
    });
  });

  describe('Cross-page Navigation Flows', () => {
    it('should support a complete user journey across multiple pages', () => {
      // Start journey on homepage
      cy.visit('/');

      // Navigate to About page
      cy.get('footer').scrollIntoView();
      cy.get('footer').contains('a', 'About Us').click();
      cy.url().should('include', '/about');

      // From About to Committees
      cy.contains('a', 'View Committees').click();
      cy.url().should('include', '/committees');

      // From Committees to Calendar
      cy.contains('a', 'View Calendar').click();
      cy.url().should('include', '/calendar');

      // From Calendar to Join
      cy.contains('a', 'Join Delaware DSA').click();
      cy.url().should('include', '/join');

      // Complete journey with contact page
      cy.contains('a', 'Contact').click();
      cy.url().should('include', '/contact');

      // Return to home
      cy.get('header').find('a[href="/"]').first().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should maintain navigation state when using browser back/forward', () => {
      // Visit several pages in sequence
      cy.visit('/');
      cy.contains('a', 'Newsletter').click();
      cy.url().should('include', '/newsletter');

      cy.contains('a', 'Calendar').click();
      cy.url().should('include', '/calendar');

      // Go back
      cy.go('back');
      cy.url().should('include', '/newsletter');

      // Go back again
      cy.go('back');
      cy.url().should('eq', Cypress.config().baseUrl + '/');

      // Go forward
      cy.go('forward');
      cy.url().should('include', '/newsletter');

      // Verify page content is correct
      cy.get('h1').contains('Newsletter').should('be.visible');
    });
  });
});
