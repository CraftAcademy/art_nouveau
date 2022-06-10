/* eslint-disable no-undef */
describe("When a user visits the application", () => {
  beforeEach(() => {
    // Add an intercept
    cy.intercept('GET', '**/projects', { fixture: 'projectsIndex.json'}).as('projectsIndex')
    cy.visit("/");
  });

  it('is expected to make an API call', () => {
    cy.wait('@projectsIndex').its('request.method').should('eql', 'GET')
  });
  
  it("is expected to display a list of projects", () => {
    cy.get("[data-cy=projects-list]").should("have.length", 3);
  });
});
