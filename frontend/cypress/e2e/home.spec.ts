


describe('Home Page', () => {
  beforeEach(() => {
    
    cy.visit('/');

    
    cy.get('h1').should('be.visible');
  });

  it('should display the main heading and hero section', () => {
    
    cy.get('h1').contains('Delaware DSA').should('be.visible');

    
    cy.contains('member-run, democratic socialist organization').should('be.visible');

    
    cy.contains('a', 'Join Our Chapter').should('be.visible');
    cy.contains('a', 'Subscribe to Newsletter').should('be.visible');
  });

  it('should navigate to Join page when clicking primary CTA', () => {
    
    cy.contains('a', 'Join Our Chapter').click();

    
    cy.url().should('include', '/join');
    cy.get('h1').contains('Join Delaware DSA').should('be.visible');
  });

  it('should display the mission statement section', () => {
    
    cy.contains('h2', 'Our Mission').should('be.visible');

    
    cy.contains('building a more just, equitable society').should('be.visible');

    
    cy.contains('a', 'What We Stand For').should('be.visible');
  });

  it('should display latest updates section with posts', () => {
    
    cy.contains('h2', 'Latest Updates').should('be.visible');

    
    cy.get('[data-testid="latest-updates-section"]').then(($section) => {
      
      if ($section.find('article').length > 0) {
        cy.get('article').should('have.length.at.least', 1);
      } else {
        cy.contains('Loading recent posts...').should('be.visible');
      }
    });

    
    cy.contains('a', 'View All Updates')
      .should('be.visible')
      .and('have.attr', 'href', '/newsletter');
  });

  it('should display the get involved section', () => {
    
    cy.contains('h2', 'Get Involved').should('be.visible');

    
    cy.contains('Upcoming Events').should('be.visible');
    cy.contains('Committees & Working Groups').should('be.visible');

    
    cy.contains('a', 'View Calendar').should('be.visible');
    cy.contains('a', 'Find Your Committee').should('be.visible');
  });

  it('should display call to action at the bottom', () => {
    
    cy.contains('h2', 'Join the Movement').should('be.visible');

    
    cy.contains('Together, we can build a better Delaware').should('be.visible');
    cy.contains('a', 'Join Delaware DSA').should('be.visible');
  });

  it('should have a working header with navigation', () => {
    
    cy.get('header').should('be.visible');

    
    cy.get('header').within(() => {
      cy.contains('a', 'Newsletter').should('be.visible');
      cy.contains('a', 'What We Stand For').should('be.visible');
      cy.contains('a', 'Calendar').should('be.visible');
      cy.contains('a', 'Leadership').should('be.visible');
      cy.contains('a', 'Committees').should('be.visible');
    });
  });

  it('should have a working footer with sections', () => {
    
    cy.get('footer').should('be.visible');

    
    cy.get('footer').within(() => {
      cy.contains('Delaware DSA').should('be.visible');
      cy.contains('Learn').should('be.visible');
      cy.contains('Get Involved').should('be.visible');
      cy.contains('Resources').should('be.visible');

      
      cy.contains('© ' + new Date().getFullYear() + ' Delaware DSA').should('be.visible');
    });
  });
});
