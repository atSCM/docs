import { tags } from '../../src/data/index.json'; // eslint-disable-line import/no-unresolved

const tag = tags.find(t => t.tag === 'beta');

describe('From CLI page', () => {
  it('should redirect to exact version', () => {
    cy.visit(`/from-cli/?version=${tag.version}`);
    cy.url().should('include', `/${tag.tag}`);
  });

  it('should redirect to best matching version', () => {
    const [major, minor, patch] = tag.version.split('.');
    cy.visit(`/from-cli/?version=${major}.${minor}.${parseInt(patch, 10) + 1}`);
    cy.url().should('include', `/${tag.tag}`);
    cy.contains('.message', 'The exact version you requested couldn\'t be found')
  });

  it('should redirect to best matching version', () => {
    const [major, minor, patch] = tag.version.split('.');
    cy.visit(`/from-cli/?version=${major}.${minor}.${parseInt(patch, 10) + 1}`);
    cy.url().should('include', `/${tag.tag}`);
    cy.contains('.message', 'The exact version you requested couldn\'t be found')
  });

  it('should fallback to latest for invalid versions', () => {
    cy.visit(`/from-cli/?version=1234`);
    cy.url().should('include', `/latest`);
    cy.contains('.message', 'The exact version you requested couldn\'t be found')
  });

  it('should fallback to latest without a version', () => {
    cy.visit(`/from-cli`);
    cy.url().should('include', `/latest`);
    cy.contains('.message', 'The exact version you requested couldn\'t be found')
  });
});
