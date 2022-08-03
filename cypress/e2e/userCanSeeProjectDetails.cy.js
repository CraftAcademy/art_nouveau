/* eslint-disable no-undef */
describe("When a user see the project listing ", () => {
  beforeEach(() => {
    cy.visitApplication();
  });

  describe("as an authenticated user", () => {
    beforeEach(() => {
      cy.authenticateUser({
        name: "Thomas",
        email: "thomas@random.com",
        roles: ["artist"],
      });
    });
    it("is expected to have a currentUser in application state", () => {
      cy.applicationState()
        .invoke("getState")
        .its("user.currentUser")
        .should("eql", {
          name: "Thomas",
          email: "thomas@random.com",
          roles: ["artist"],
        });
    });

    it("is expected to see a 'read more' link for each project", () => {
      cy.projectItems().first().should("contain", "read more...");
    });

    describe('following the "read more..." link', () => {
      beforeEach(() => {
        cy.get("[data-cy=project-1-link]").click();
      });

      it("is expected to direct user to new url when clicked", () => {
        cy.url().should("include", "/projects/1");
      });

      it("is expected to display the project details", () => {
        cy.get("body")
          .should("contain", "3D disco")
          .and("contain", "Lorem ipsum...");
      });
    });
  });

  describe("as a visitor", () => {
    it("is expected to see a 'read more' link for each project", () => {
      cy.projectItems().first().should("contain", "read more...");
    });

    it("is expected to route visitor to sign-up view", () => {
      cy.visit("projects/1");
      cy.url().should("include", "/auth");
    });

    it("is expected to kick the user out when trying to navigate to project detail view", () => {
      cy.intercept("GET", "**/projects/1", { statusCode: 401 });
      cy.visit("projects/1");
      cy.get("body").should("contain", "You can't do that!");
    });
  });
});
