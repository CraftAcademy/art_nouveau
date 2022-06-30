/* eslint-disable no-undef */
describe('When visiting the application, visitor', () => {
  

  beforeEach(() => {
    cy.visitApplication()
  });

  it('is expected to see a navigation bar', () => {
    cy.get('[data-cy=navigation-bar]').should('be.visible')
  });
  
});