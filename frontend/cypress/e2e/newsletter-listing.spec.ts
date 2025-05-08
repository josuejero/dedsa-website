/// <reference types="cypress" />
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
