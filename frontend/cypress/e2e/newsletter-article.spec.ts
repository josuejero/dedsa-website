/// <reference types="cypress" />
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
