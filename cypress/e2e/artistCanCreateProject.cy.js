/* eslint-disable no-undef */
describe("When an artist creates a project", () => {
  beforeEach(() => {
    cy.visitApplication();
    cy.authenticateUser({ roles: ["artist"] });
    cy.getCy("create-project").click();
  });

  describe("successfully", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/projects", {
        fixture: "projectCreateSuccessfulResponse.json",
        statusCode: 201,
      }).as("createProject");
      cy.getCy("project-title").type("My awesome project");
      cy.getCy("project-description").type("Yada yada...");
      cy.getCy("project-submit").click();
    });

    it("is expected to make a network call on submit", () => {
      cy.wait("@createProject").its("request.method").should("eql", "POST");
    });

    it("is expected to include form data as params", () => {
      cy.wait("@createProject").then(({ request }) => {
        expect(request.body.params.title).to.eql("My awesome project");
        expect(request.body.params.description).to.eql("Yada yada...");
      });
    });

    it("is expected to respond with a 201 status", () => {
      cy.wait("@createProject").its("response.statusCode").should("eql", 201);
    });

    it('is expected to redirect to projects show page', () => {
      cy.url().should('include', '/projects/100')
    });

    it('is expected to display a success message', () => {
      cy.get('body').should('contain.text', 'Your project was created')
    });
  });

  describe("unsuccessfully", () => {});
});
