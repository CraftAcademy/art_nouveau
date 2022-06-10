describe("When a user visits the application", () => {
  beforeEach(() => {
    // Add an intercept
    cy.visit("/");
  });

  it("is expected to display a list of projects", () => {
    cy.get("[data-cy=projects-list]").should("have.length", 6);
  });
});
