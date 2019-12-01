describe('Navbar', () => {
  beforeEach(() => {
    cy.visit('/latest');
  });

  context('on small devices', () => {
    beforeEach(() => cy.viewport('iphone-x'));

    it('shows menu on click', () => {
      cy.get('.navbar-menu').should('not.be.visible');
      cy.get('.navbar-burger')
        .should('be.visible')
        .click();
      cy.get('.navbar-menu').should('be.visible');
    });
  });

  context('on large devices', () => {
    beforeEach(() => cy.viewport('macbook-13'));

    it('has visible menu', () => {
      cy.get('.navbar-menu').should('be.visible');
    });
  });
});
