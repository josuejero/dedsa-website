/**
 * Newsletter E2E tests
 *
 * Tests the newsletter section functionality, including:
 * - Newsletter page rendering
 * - Newsletter article navigation
 * - Category filtering
 * - Newsletter subscription form
 */

describe('Newsletter Functionality', () => {
  describe('Newsletter Listing Page', () => {
    beforeEach(() => {
      // Visit the newsletter page
      cy.visit('/newsletter');

      // Wait for page to load
      cy.get('h1').contains('Newsletter').should('be.visible');
    });

    it('should display the newsletter page with heading and description', () => {
      // Check page title
      cy.get('h1').contains('Newsletter').should('be.visible');

      // Check page description
      cy.contains('Latest news, updates, and articles from Delaware DSA').should('be.visible');
    });

    it('should display the newsletter subscription banner', () => {
      // Check newsletter signup banner
      cy.contains('h2', 'Stay Updated').should('be.visible');

      // Check form elements
      cy.get('input[type="email"]').should('be.visible');
      cy.get('form').contains('button', 'Subscribe').should('be.visible');
    });

    it('should display a list of articles', () => {
      // There should either be articles or a loading state
      cy.get('main').then(($main) => {
        if ($main.find('article').length > 0) {
          // Check that articles are displayed
          cy.get('article').should('have.length.at.least', 1);

          // Each article should have key elements
          cy.get('article')
            .first()
            .within(() => {
              cy.get('h2').should('be.visible'); // Title
              cy.contains('Read more').should('be.visible'); // Read more link
            });
        } else {
          // If no articles, should show loading or empty state
          cy.contains('Loading recent posts...').should('be.visible');
        }
      });
    });

    it('should have working category filters in the sidebar', () => {
      // Check category section exists
      cy.contains('h3', 'Categories').should('be.visible');

      // There should be an "All Posts" option
      cy.contains('button', 'All Posts').should('be.visible');

      // Click on a category (if any exist)
      cy.get('aside').then(($aside) => {
        // If there are categories other than "All Posts"
        if ($aside.find('button').length > 1) {
          // Click the second category (first after "All Posts")
          cy.get('aside').find('button').eq(1).click();

          // URL should update with category parameter
          cy.url().should('include', '?category=');

          // Selected category should be highlighted
          cy.get('aside').find('button').eq(1).should('have.class', 'font-semibold');

          // Click back to "All Posts"
          cy.contains('button', 'All Posts').click();

          // URL should not have category parameter
          cy.url().should('not.include', '?category=');
        }
      });
    });

    it('should navigate to article detail when clicking "Read more"', () => {
      // Find the first article and click its "Read more" link
      cy.get('article')
        .first()
        .within(() => {
          // Store the article title for later comparison
          cy.get('h2').invoke('text').as('articleTitle');

          cy.contains('a', 'Read more').click();
        });

      // On article detail page, URL should include /newsletter/
      cy.url().should('include', '/newsletter/');

      // Article title should match the one we clicked
      cy.get('@articleTitle').then((title) => {
        cy.get('h1').should('contain', title);
      });
    });
  });

  describe('Newsletter Article Detail Page', () => {
    beforeEach(() => {
      // First go to newsletter page
      cy.visit('/newsletter');

      // Click on the first article
      cy.get('article')
        .first()
        .within(() => {
          cy.contains('a', 'Read more').click();
        });

      // Wait for article page to load
      cy.get('article').should('be.visible');
    });

    it('should display the full article with title and content', () => {
      // Check article title exists
      cy.get('h1').should('be.visible');

      // Check article has content
      cy.get('article .prose').should('be.visible');

      // Check publish date exists
      cy.get('article')
        .contains(
          /January|February|March|April|May|June|July|August|September|October|November|December/,
        )
        .should('be.visible');
    });

    it('should display author information', () => {
      // Check author section exists
      cy.get('article').within(() => {
        // Either author name or default "Delaware DSA" should be visible
        cy.get('.flex.items-center').should('be.visible');
      });
    });

    it('should have breadcrumb navigation', () => {
      // Check breadcrumbs exist
      cy.get('nav ol').should('be.visible');

      // Check Home link
      cy.get('nav ol a').first().should('have.attr', 'href', '/');

      // Check Newsletter link
      cy.get('nav ol a').eq(1).should('have.attr', 'href', '/newsletter');

      // Test navigation back to newsletter page
      cy.get('nav ol a').eq(1).click();

      // Should be back on newsletter page
      cy.url().should('include', '/newsletter');
      cy.url().should('not.include', '/newsletter/');
      cy.get('h1').contains('Newsletter').should('be.visible');
    });

    it('should have a working "Back to Newsletter" link', () => {
      // Go back to article page
      cy.go('back');

      // Find and click the back link
      cy.contains('a', 'Back to Newsletter').click();

      // Should be back on newsletter page
      cy.url().should('include', '/newsletter');
      cy.url().should('not.include', '/newsletter/');
      cy.get('h1').contains('Newsletter').should('be.visible');
    });

    it('should display related articles section if applicable', () => {
      // Check if related articles section exists
      cy.get('body').then(($body) => {
        if ($body.find('h2:contains("Related Articles")').length > 0) {
          // Related articles section exists
          cy.contains('h2', 'Related Articles').should('be.visible');

          // Should have at least one related article
          cy.get('h2:contains("Related Articles")')
            .parent()
            .find('a')
            .should('have.length.at.least', 1);

          // Click on a related article
          cy.get('h2:contains("Related Articles")').parent().find('a').first().click();

          // Should navigate to a different article
          cy.url().should('include', '/newsletter/');
        }
      });
    });
  });

  describe('Newsletter Subscription Form', () => {
    beforeEach(() => {
      // Visit the newsletter page
      cy.visit('/newsletter');

      // Find the subscription form
      cy.get('form').within(() => {
        cy.get('input[type="email"]').should('be.visible');
      });
    });

    it('should validate email input', () => {
      // Try submitting with empty email
      cy.get('form').within(() => {
        cy.get('button[type="submit"]').click();

        // Form should not be submitted (validation prevents it)
        cy.get('input[type="email"]:invalid').should('exist');
      });

      // Try with invalid email format
      cy.get('form').within(() => {
        cy.get('input[type="email"]').type('invalid-email');
        cy.get('button[type="submit"]').click();

        // Form should not be submitted
        cy.get('input[type="email"]:invalid').should('exist');
      });
    });

    it('should handle form submission', () => {
      // In a real implementation, we would intercept API calls
      // Since we're using client-side success/error state management:

      // Submit with valid email
      cy.get('form').within(() => {
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('button[type="submit"]').click();
      });

      // One of these should happen:
      // 1. Success message appears
      // 2. Form shows "Subscribing..." state
      cy.get('body').then(($body) => {
        if ($body.find('h2:contains("Thank You")').length > 0) {
          // Success state
          cy.contains('h2', 'Thank You').should('be.visible');
          cy.contains('successfully subscribed').should('be.visible');
        } else {
          // Still submitting state
          cy.contains('Subscribing...').should('be.visible');

          // Since it's a mock without a backend, we can't test further without intercepting XHR
        }
      });
    });

    it('should handle subscription form in site footer', () => {
      // Check if there's a newsletter form in the footer too
      cy.get('footer').scrollIntoView();

      cy.get('footer').then(($footer) => {
        // If footer has a newsletter subscription form
        if ($footer.find('input[type="email"]').length > 0) {
          // Try submitting with valid email
          cy.get('footer').within(() => {
            cy.get('input[type="email"]').type('footer-test@example.com');
            cy.get('button[type="submit"]').click();

            // Check submission state or success message
            cy.get('body').then(($body) => {
              if ($body.find('h2:contains("Thank You")').length > 0) {
                cy.contains('h2', 'Thank You').should('be.visible');
              } else if ($body.find('button:contains("Subscribing")').length > 0) {
                cy.contains('Subscribing').should('be.visible');
              }
            });
          });
        }
      });
    });
  });
});
