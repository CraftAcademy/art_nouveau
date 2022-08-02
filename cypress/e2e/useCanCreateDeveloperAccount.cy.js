/* eslint-disable no-undef */
describe("When user creates a developer account", () => {
  beforeEach(() => {
    cy.visitApplication();
  });

  describe("as an unauthenticated user", () => {
    describe("successfully as a developer", () => {
      beforeEach(() => {
        cy.intercept('GET', 'projects/1', {fixture: 'projectsShowId1.json'})
        cy.intercept("POST", "**/auth**", {
          fixture: "createAccountResponseForDeveloperAccount.json",
          statusCode: 201,
        }).as("createAccount");
        cy.getCy("project-1-link").click();

        cy.signUp({
          email: "user@email.com",
          password: "password",
          roles: ["developer"],
        });
      });

      it("is expected to make a network call on submit", () => {
        cy.wait("@createAccount").its("request.method").should("eql", "POST");
      });

      it("is expected to include form data as params", () => {
        cy.wait("@createAccount").then(({ request }) => {
          expect(request.body.params.email).to.eql("user@email.com");
          expect(request.body.params.password).to.eql("password");
          expect(request.body.params.passwordConf).to.eql("password");
          expect(request.body.params.roles).to.eql(["developer"]);
        });
      });

      it("is expected to respond with a 201 status", () => {
        cy.wait("@createAccount").its("response.statusCode").should("eql", 201);
      });

      it("is expected to redirect user to project listing view", () => {
        cy.url().should("include", "/projects/1");
      });

      it("is expected to show a join project button", () => {
        cy.getCy("project-join").should("be.visible");
      });
    });
  });
});
