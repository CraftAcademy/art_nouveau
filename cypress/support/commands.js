/* eslint-disable no-undef */
Cypress.Commands.add('getCy', (identifier) => {
  cy.get(`[data-cy=${identifier}]`)
})


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


Cypress.Commands.add('signUp', (options) => {
  cy.get("[data-cy=create-account-form]").within(() => {
    cy.get("[data-cy=email]").type(options.email);
    cy.get("[data-cy=password]").type(options.password);
    cy.get("[data-cy=password-conf]").type(options.passordConf || options.password);
    cy.get("[data-cy=submit]").click();
  });
})