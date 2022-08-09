/* eslint-disable no-undef */
describe('When visiting the application, visitor', () => {
  beforeEach(() => {
    cy.visitApplication()
  });

  it('is expected to see a navigation bar', () => {
    cy.get('[data-cy=navigation-bar]').should('be.visible')
  });

  it('is expected to see a hero element', () => {
    cy.get('[data-cy=hero-section]').should('be.visible')
  });

  it('is expected to see a footer', () => {
    cy.get('[data-cy=footer]').should('be.visible')
  });
});