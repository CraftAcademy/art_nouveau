/* eslint-disable no-undef */
describe("When an artist creates a project", () => {
  beforeEach(() => {
    cy.visitApplication();
    cy.authenticateUser({ roles: ["artist"] });
    cy.getCy("create-project").click();
  });

  describe("successfully", () => {
    it("is expected to display a create project input form", () => {
      cy.getCy("project-create-ui").should("be.visible");
      cy.getCy('project-title').type('My awesome project')
      cy.getCy('project-description').type('Yada yada...')
      cy.getCy('project-submit').click()
    });
  });

  describe("unsuccessfully", () => {});
});
