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

  it("is expected to store project data in application state", () => {
    cy.wait("@projectsIndex");
    cy.window()
      .its("store")
      .invoke("getState")
      .its("projects.projects")
      .should("be.an", "array")
      .and("have.length", 3);
  });

  it("is expected to display the title and description of the projects", () => {
    cy.get("[data-cy=projects-list]")
      .children()
      .first()
      .should("contain.text", "3D disco")
      .and("contain.text", "Lorem ipsum...")
      .next()
      .should("contain.text", "City Art Walk")
      .and("contain.text", "Lorem ipsum...")
      .next()
      .should("contain.text", "Jazz Concert Promo Poster & Website")
      .and("contain.text", "Lorem ipsum...");
  });
});
