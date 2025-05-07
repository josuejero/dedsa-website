/// <reference types="cypress" />
/**
 * Home page E2E tests
 *
 * Tests the core functionality of the Delaware DSA homepage, including:
 * - Page rendering
 * - Primary navigation elements
 * - Call-to-action buttons
 * - Latest updates section
 * - Get involved section
 */

describe('Home Page', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');

    // Wait for page to fully load and hydrate
    cy.get('h1').should('be.visible');
  });

  it('should display the main heading and hero section', () => {
    // Verify main heading
    cy.get('h1').contains('Delaware DSA').should('be.visible');

    // Verify hero section content
    cy.contains('member-run, democratic socialist organization').should('be.visible');

    // Verify CTA buttons
    cy.contains('a', 'Join Our Chapter').should('be.visible');
    cy.contains('a', 'Subscribe to Newsletter').should('be.visible');
  });

  it('should navigate to Join page when clicking primary CTA', () => {
    // Click on the primary CTA
    cy.contains('a', 'Join Our Chapter').click();

    // Verify navigation to Join page
    cy.url().should('include', '/join');
    cy.get('h1').contains('Join Delaware DSA').should('be.visible');
  });

  it('should display the mission statement section', () => {
    // Verify mission section exists
    cy.contains('h2', 'Our Mission').should('be.visible');

    // Verify mission content
    cy.contains('building a more just, equitable society').should('be.visible');

    // Verify "What We Stand For" CTA
    cy.contains('a', 'What We Stand For').should('be.visible');
  });

  it('should display latest updates section with posts', () => {
    // Verify updates section
    cy.contains('h2', 'Latest Updates').should('be.visible');

    // Verify posts are loaded (either real posts or loading message)
    cy.get('[data-testid="latest-updates-section"]').then(($section) => {
      // Either posts should exist or a loading message
      if ($section.find('article').length > 0) {
        cy.get('article').should('have.length.at.least', 1);
      } else {
        cy.contains('Loading recent posts...').should('be.visible');
      }
    });

    // Verify "View All Updates" button
    cy.contains('a', 'View All Updates')
      .should('be.visible')
      .and('have.attr', 'href', '/newsletter');
  });

  it('should display the get involved section', () => {
    // Verify get involved section
    cy.contains('h2', 'Get Involved').should('be.visible');

    // Verify the two main involvement options
    cy.contains('Upcoming Events').should('be.visible');
    cy.contains('Committees & Working Groups').should('be.visible');

    // Verify CTAs for each option
    cy.contains('a', 'View Calendar').should('be.visible');
    cy.contains('a', 'Find Your Committee').should('be.visible');
  });

  it('should display call to action at the bottom', () => {
    // Find the final CTA
    cy.contains('h2', 'Join the Movement').should('be.visible');

    // Verify CTA text and button
    cy.contains('Together, we can build a better Delaware').should('be.visible');
    cy.contains('a', 'Join Delaware DSA').should('be.visible');
  });

  it('should have a working header with navigation', () => {
    // Check header exists
    cy.get('header').should('be.visible');

    // Verify main navigation links
    cy.get('header').within(() => {
      cy.contains('a', 'Newsletter').should('be.visible');
      cy.contains('a', 'What We Stand For').should('be.visible');
      cy.contains('a', 'Calendar').should('be.visible');
      cy.contains('a', 'Leadership').should('be.visible');
      cy.contains('a', 'Committees').should('be.visible');
    });
  });

  it('should have a working footer with sections', () => {
    // Check footer exists
    cy.get('footer').should('be.visible');

    // Verify footer sections
    cy.get('footer').within(() => {
      cy.contains('Delaware DSA').should('be.visible');
      cy.contains('Learn').should('be.visible');
      cy.contains('Get Involved').should('be.visible');
      cy.contains('Resources').should('be.visible');

      // Check copyright info
      cy.contains('© ' + new Date().getFullYear() + ' Delaware DSA').should('be.visible');
    });
  });
});
