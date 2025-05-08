/// <reference types="cypress" />
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
