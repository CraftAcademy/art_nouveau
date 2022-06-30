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
      cy.get("[data-cy=create-project-btn]").click();
    });
    it("is expected to direct user to create project view", () => {
      cy.url().should("include", "/projects/create");
    });
  });

  describe("as an unauthenticated user", () => {
    beforeEach(() => {
      cy.get("[data-cy=create-project-btn]").click();
    });
    describe("successfully", () => {
      // Add intercept for POST request to create account
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
