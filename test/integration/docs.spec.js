describe('Documentation page', () => {
  beforeEach(() => {
    cy.visit('/latest');
    cy.viewport('macbook-13');
  });

  it('has the correct title', () => {
    cy.contains('h1', 'atscm');
  });

  it('navigates to alternate version', () => {
    cy.get('a span').contains('beta').click({ force: true });
    cy.url().should('include', '/beta');
  });
});
