/* eslint-disable no-undef */
describe("When a user visits the application", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/projects", { fixture: "projectsIndex.json" }).as(
      "projectsIndex"
    );
    cy.visit("/");
  });

  it("is expected to make an API call", () => {
    cy.wait("@projectsIndex").its("request.method").should("eql", "GET");
  });

  it("is expected to display a list of projects", () => {
    cy.get("[data-cy=projects-list]").children().should("have.length", 3);
  });

  it.only("is expected to display the title of the first project", () => {
    cy.get("[data-cy=projects-list]")
      .children()
      .first()
      .should("contain.text", "3D disco");
  });
});
