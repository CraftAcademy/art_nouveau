/* eslint-disable no-undef */
describe("When user creates an artist account", () => {
  beforeEach(() => {
    cy.visitApplication();
  });

  describe("as an authenticated user", () => {
    beforeEach(() => {
      cy.applicationState().invoke("dispatch", {
        type: "user/setCurrentUser",
        payload: { name: "Thomas", email: "thomas@random.com" },
      });
      cy.get("[data-cy=create-project]").click();
    });

    it("is expected to direct user to create project view", () => {
      cy.url().should("include", "/projects/create");
    });

    it("is expected to display project create form", () => {
      cy.get("[data-cy=project-create-ui]").should("be.visible");
    });
  });

  describe("as an unauthenticated user", () => {
    describe("successfully", () => {
      beforeEach(() => {
        cy.intercept("POST", "**/auth**", {
          fixture: "createAccountResponse.json",
          statusCode: 201,
        }).as("createAccount");
        cy.get("[data-cy=create-project]").click();
        cy.get("[data-cy=create-account-form]").within(() => {
          cy.get("[data-cy=email]").type("user@email.com");
          cy.get("[data-cy=password]").type("password");
          cy.get("[data-cy=password-conf]").type("password");
          cy.get("[data-cy=submit]").click();
        });
      });

      it.only("is expected to make a network call on submit", () => {
        cy.wait("@createAccount")
          .its("request.method")
          .should("eql", "POST")
          .and("response.status", 201);
      });
      // Expect url to go to login path
      // Fill out create account form
      // Send it off
      // Expect message
      // Expect url /create
    });

    describe("unsuccessfully", () => {
      // Add intercept with 422 or similar
      // Expect url to go to login path
      // Fill out create account form
      // Send it off
      // Expect error message
      // Expect url /login
    });
  });
});
