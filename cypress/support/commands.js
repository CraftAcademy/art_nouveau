/* eslint-disable no-undef */

Cypress.Commands.add("visitApplication", () => {
  cy.intercept("GET", "**/projects", { fixture: "projectsIndex.json" }).as(
    "projectsIndex"
  );
  cy.visit("/");
});

Cypress.Commands.add("projectItems", () => {
  cy.get("[data-cy=projects-list]").children();
});

Cypress.Commands.add('applicationState', () => {
  cy.window().its("store")
})
