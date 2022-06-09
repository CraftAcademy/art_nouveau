/* eslint-disable no-undef */
describe("User visiting the application", () => {
  it("is expected to see 'Hello World'", () => {
    cy.visit("/");
    cy.get("body").should("contain.text", "Hello World");
  });
});
