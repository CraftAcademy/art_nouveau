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

    it("is expected to display a create project input form", () => {
      cy.getCy("project-create-ui").should("be.visible");
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
  });

  describe("unsuccessfully", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/projects", {
        fixture: "projectCreateErrorResponse.json",
        statusCode: 422,
      }).as("createProjectError");
      // cy.getCy("project-submit").click();
    });

    describe("with a empty description field", () => {
      beforeEach(() => {
        cy.getCy("project-title").type("My awesome project");
      });

      it.only("is expected to only display a disabled submit button", () => {
        cy.getCy("project-submit").should("be.disabled");
        cy.getCy("project-description").type("Something something...");
        cy.getCy("project-submit").should("not.be.disabled");
      });
    });

    it("is expected to respond with a 422 status", () => {
      cy.wait("@createProjectError")
        .its("response.statusCode")
        .should("eql", 422);
    });

    it("is expected to inform the user something went wrong", () => {
      cy.get("body").should("contain.text", "Description can't be empty");
    });
  });
});
