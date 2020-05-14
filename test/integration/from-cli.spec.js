import { lte } from 'semver'
import { tags } from '../../src/data/index.json'; // eslint-disable-line import/no-unresolved

const betaTag = tags.find(t => t.tag === 'beta');
const latestTag = tags.find(t => t.tag === 'latest');

const [betaVersion] = betaTag.version.split('-');

const noBeta = lte(betaVersion, latestTag.version);
const skipWithoutBeta = noBeta ? it.skip : it;

describe('From CLI page', () => {
  it('should redirect to exact version', () => {
    cy.visit(`/from-cli/?version=${betaTag.version}`);
    cy.url().should('include', `/${betaTag.tag}`);
  });

  skipWithoutBeta('should redirect to best matching version', () => {
    const [major, minor, patch] = betaTag.version.split('.');
    cy.visit(`/from-cli/?version=${major}.${minor}.${parseInt(patch, 10) + 1}`);
    cy.url().should('include', `/${betaTag.tag}`);
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
