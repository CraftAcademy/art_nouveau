/* eslint-disable no-undef */
describe("When a user see the project listing ", () => {
  beforeEach(() => {
    cy.visitApplication();
  });

  describe("as an authenticated user", () => {
    beforeEach(() => {
      cy.applicationState()
        .invoke("dispatch", {
          type: "user/setCurrentUser",
          payload: { name: "Thomas", email: "thomas@random.com" },
        });
    });
    it("is expected to have a currentUser in application state", () => {
      cy.applicationState()
        .invoke("getState")
        .its("user.currentUser")
        .should("eql", { name: "Thomas", email: "thomas@random.com" });
    });

    it("is expected to see a 'read more' link for each project", () => {
      cy.projectItems().first().should("contain", "read more...");
    });
  });

  describe("as a visitor", () => {
    it("is expected NOT to see a 'read more' link for each project", () => {
      cy.projectItems().first().should("not.contain", "read more...");
    });
  });
});
