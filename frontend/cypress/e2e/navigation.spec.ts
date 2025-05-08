describe('Site Navigation', () => {
  beforeEach(() => {
    cy.visit('/');

    cy.get('header').should('be.visible');
  });

  describe('Desktop Navigation', () => {
    beforeEach(() => {
      cy.viewport(1280, 800);
    });

    it('should display all primary navigation items in the header', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/"]').should('be.visible');

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

        cy.contains('a', 'Join Our Chapter')
          .should('be.visible')
          .should('have.attr', 'href', '/join');
      });
    });

    it('should navigate to correct pages when clicking header links', () => {
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
      cy.get('footer').scrollIntoView().should('be.visible');

      cy.get('footer').within(() => {
        cy.contains('Learn').should('be.visible');
        cy.contains('Get Involved').should('be.visible');
        cy.contains('Resources').should('be.visible');

        cy.contains('a', 'About Us').click();
      });

      cy.url().should('include', '/about');
      cy.get('h1').contains('About Delaware DSA').should('be.visible');

      cy.visit('/');
      cy.get('footer').scrollIntoView();

      cy.get('footer').within(() => {
        cy.contains('a', 'Committees').click();
      });

      cy.url().should('include', '/committees');
      cy.get('h1').contains('Committees & Working Groups').should('be.visible');
    });

    it('should return to homepage when clicking the logo', () => {
      cy.contains('a', 'Contact').click();
      cy.url().should('include', '/contact');

      cy.get('header').find('a[href="/"]').first().click();

      cy.url().should('eq', Cypress.config().baseUrl + '/');
      cy.get('h1').contains('Delaware DSA').should('be.visible');
    });
  });

  describe('Mobile Navigation', () => {
    beforeEach(() => {
      cy.viewport('iphone-8');
    });

    it('should display mobile menu button and toggle navigation', () => {
      cy.get('header').within(() => {
        cy.get('a[href="/"]').should('be.visible');

        cy.contains('a', 'Newsletter').should('not.be.visible');

        cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]')
          .should('be.visible')
          .as('menuButton');

        cy.get('@menuButton').click();

        cy.contains('a', 'Newsletter').should('be.visible');
        cy.contains('a', 'Calendar').should('be.visible');
        cy.contains('a', 'What We Stand For').should('be.visible');

        cy.get('@menuButton').click();

        cy.contains('a', 'Newsletter').should('not.be.visible');
      });
    });

    it('should navigate to correct pages when using mobile menu', () => {
      cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]').click();

      cy.contains('a', 'Calendar').click();

      cy.url().should('include', '/calendar');
      cy.get('h1').contains('Events Calendar').should('be.visible');

      cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]').should(
        'be.visible',
      );
      cy.contains('a', 'Newsletter').should('not.be.visible');
    });

    it('should display the join button in mobile menu', () => {
      cy.get('button[aria-label="Open menu"], button[aria-label="Toggle menu"]').click();

      cy.contains('a', 'Join Our Chapter')
        .should('be.visible')
        .should('have.attr', 'href', '/join');

      cy.contains('a', 'Join Our Chapter').click();

      cy.url().should('include', '/join');
      cy.get('h1').contains('Join Delaware DSA').should('be.visible');
    });
  });

  describe('Cross-page Navigation Flows', () => {
    it('should support a complete user journey across multiple pages', () => {
      cy.visit('/');

      cy.get('footer').scrollIntoView();
      cy.get('footer').contains('a', 'About Us').click();
      cy.url().should('include', '/about');

      cy.contains('a', 'View Committees').click();
      cy.url().should('include', '/committees');

      cy.contains('a', 'View Calendar').click();
      cy.url().should('include', '/calendar');

      cy.contains('a', 'Join Delaware DSA').click();
      cy.url().should('include', '/join');

      cy.contains('a', 'Contact').click();
      cy.url().should('include', '/contact');

      cy.get('header').find('a[href="/"]').first().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('should maintain navigation state when using browser back/forward', () => {
      cy.visit('/');
      cy.contains('a', 'Newsletter').click();
      cy.url().should('include', '/newsletter');

      cy.contains('a', 'Calendar').click();
      cy.url().should('include', '/calendar');

      cy.go('back');
      cy.url().should('include', '/newsletter');

      cy.go('back');
      cy.url().should('eq', Cypress.config().baseUrl + '/');

      cy.go('forward');
      cy.url().should('include', '/newsletter');

      cy.get('h1').contains('Newsletter').should('be.visible');
    });
  });
});
