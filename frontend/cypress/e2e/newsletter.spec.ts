

describe('Newsletter Functionality', () => {
  describe('Newsletter Listing Page', () => {
    beforeEach(() => {
      
      cy.visit('/newsletter');

      
      cy.get('h1').contains('Newsletter').should('be.visible');
    });

    it('should display the newsletter page with heading and description', () => {
      
      cy.get('h1').contains('Newsletter').should('be.visible');

      
      cy.contains('Latest news, updates, and articles from Delaware DSA').should('be.visible');
    });

    it('should display the newsletter subscription banner', () => {
      
      cy.contains('h2', 'Stay Updated').should('be.visible');

      
      cy.get('input[type="email"]').should('be.visible');
      cy.get('form').contains('button', 'Subscribe').should('be.visible');
    });

    it('should display a list of articles', () => {
      
      cy.get('main').then(($main) => {
        if ($main.find('article').length > 0) {
          
          cy.get('article').should('have.length.at.least', 1);

          
          cy.get('article')
            .first()
            .within(() => {
              cy.get('h2').should('be.visible'); 
              cy.contains('Read more').should('be.visible'); 
            });
        } else {
          
          cy.contains('Loading recent posts...').should('be.visible');
        }
      });
    });

    it('should have working category filters in the sidebar', () => {
      
      cy.contains('h3', 'Categories').should('be.visible');

      
      cy.contains('button', 'All Posts').should('be.visible');

      
      cy.get('aside').then(($aside) => {
        
        if ($aside.find('button').length > 1) {
          
          cy.get('aside').find('button').eq(1).click();

          
          cy.url().should('include', '?category=');

          
          cy.get('aside').find('button').eq(1).should('have.class', 'font-semibold');

          
          cy.contains('button', 'All Posts').click();

          
          cy.url().should('not.include', '?category=');
        }
      });
    });

    it('should navigate to article detail when clicking "Read more"', () => {
      
      cy.get('article')
        .first()
        .within(() => {
          
          cy.get('h2').invoke('text').as('articleTitle');

          cy.contains('a', 'Read more').click();
        });

      
      cy.url().should('include', '/newsletter/');

      
      cy.get('@articleTitle').then((title) => {
        cy.get('h1').should('contain', title);
      });
    });
  });

  describe('Newsletter Article Detail Page', () => {
    beforeEach(() => {
      
      cy.visit('/newsletter');

      
      cy.get('article')
        .first()
        .within(() => {
          cy.contains('a', 'Read more').click();
        });

      
      cy.get('article').should('be.visible');
    });

    it('should display the full article with title and content', () => {
      
      cy.get('h1').should('be.visible');

      
      cy.get('article .prose').should('be.visible');

      
      cy.get('article')
        .contains(
          /January|February|March|April|May|June|July|August|September|October|November|December/,
        )
        .should('be.visible');
    });

    it('should display author information', () => {
      
      cy.get('article').within(() => {
        
        cy.get('.flex.items-center').should('be.visible');
      });
    });

    it('should have breadcrumb navigation', () => {
      
      cy.get('nav ol').should('be.visible');

      
      cy.get('nav ol a').first().should('have.attr', 'href', '/');

      
      cy.get('nav ol a').eq(1).should('have.attr', 'href', '/newsletter');

      
      cy.get('nav ol a').eq(1).click();

      
      cy.url().should('include', '/newsletter');
      cy.url().should('not.include', '/newsletter/');
      cy.get('h1').contains('Newsletter').should('be.visible');
    });

    it('should have a working "Back to Newsletter" link', () => {
      
      cy.go('back');

      
      cy.contains('a', 'Back to Newsletter').click();

      
      cy.url().should('include', '/newsletter');
      cy.url().should('not.include', '/newsletter/');
      cy.get('h1').contains('Newsletter').should('be.visible');
    });

    it('should display related articles section if applicable', () => {
      
      cy.get('body').then(($body) => {
        if ($body.find('h2:contains("Related Articles")').length > 0) {
          
          cy.contains('h2', 'Related Articles').should('be.visible');

          
          cy.get('h2:contains("Related Articles")')
            .parent()
            .find('a')
            .should('have.length.at.least', 1);

          
          cy.get('h2:contains("Related Articles")').parent().find('a').first().click();

          
          cy.url().should('include', '/newsletter/');
        }
      });
    });
  });

  describe('Newsletter Subscription Form', () => {
    beforeEach(() => {
      
      cy.visit('/newsletter');

      
      cy.get('form').within(() => {
        cy.get('input[type="email"]').should('be.visible');
      });
    });

    it('should validate email input', () => {
      
      cy.get('form').within(() => {
        cy.get('button[type="submit"]').click();

        
        cy.get('input[type="email"]:invalid').should('exist');
      });

      
      cy.get('form').within(() => {
        cy.get('input[type="email"]').type('invalid-email');
        cy.get('button[type="submit"]').click();

        
        cy.get('input[type="email"]:invalid').should('exist');
      });
    });

    it('should handle form submission', () => {
      
      

      
      cy.get('form').within(() => {
        cy.get('input[type="email"]').type('test@example.com');
        cy.get('button[type="submit"]').click();
      });

      
      
      
      cy.get('body').then(($body) => {
        if ($body.find('h2:contains("Thank You")').length > 0) {
          
          cy.contains('h2', 'Thank You').should('be.visible');
          cy.contains('successfully subscribed').should('be.visible');
        } else {
          
          cy.contains('Subscribing...').should('be.visible');

          
        }
      });
    });

    it('should handle subscription form in site footer', () => {
      
      cy.get('footer').scrollIntoView();

      cy.get('footer').then(($footer) => {
        
        if ($footer.find('input[type="email"]').length > 0) {
          
          cy.get('footer').within(() => {
            cy.get('input[type="email"]').type('footer-test@example.com');
            cy.get('button[type="submit"]').click();

            
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
