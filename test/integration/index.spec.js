import { description } from '../../src/content/texts';

describe('Landing page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('has the correct title', () => {
    cy.contains('h1', 'atscm');
  });

  it('has the correct subtitle', () => {
    cy.contains('.subtitle', description);
  });

  it('navigates to latest documentation', () => {
    cy.get('a.button')
      .contains('Documentation')
      .click();
    cy.url().should('include', '/latest');
  });
});
