Cypress.Commands.overwrite('visit', (orig, url, options) => {
  orig(url, options);
  cy.get('[data-hydrated=hydrated]');
});
