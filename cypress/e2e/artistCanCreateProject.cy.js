describe("When an artist creates a project", () => {
  beforeEach(() => {
    cy.visitApplication();
    cy.authenticateUser({ roles: ["artist"] });
    cy.getCy("create-project").click();
  });

  describe("successfully", () => {
    it("is expected to display a create project input form", () => {
      cy.getCy("create-project-form").should("be.visible");
    });
  });

  describe("unsuccessfully", () => {});
});
