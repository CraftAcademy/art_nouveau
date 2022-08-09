/* eslint-disable no-undef */

const viewports = ["macbook-16", "iphone-x"];

viewports.forEach((viewport) => {
  describe(`While using the application on ${viewport}`, () => {
    beforeEach(() => {
      cy.viewport(viewport);
    });
    describe("When an artist creates a project", () => {
      beforeEach(() => {
        cy.visitApplication();
        cy.authenticateUser({ roles: ["artist"] });
        if (viewport === "iphone-x") {
          cy.get('[aria-label="Toggle Navigation"]').click();
          cy.getCy("create-project-mobile").click();
        } else {
          cy.getCy("create-project").click();
        }
      });

      describe("the submit button", () => {
        it("is expected to be disabled", () => {
          cy.getCy("project-submit").should("be.disabled");
        });

        it("is expected to remain disabled when only title field has value", () => {
          cy.getCy("project-title").type("Something something...");
          cy.getCy("project-submit").should("be.disabled");
        });

        it("is expected to remain disabled when only description field has value", () => {
          cy.getCy("project-description").type("Something something...");
          cy.getCy("project-submit").should("be.disabled");
        });

        it("is expected to be enabled when both fields have values", () => {
          cy.getCy("project-title").type("Something something...");
          cy.getCy("project-description").type("Something something...");
          cy.getCy("project-submit").should("not.be.disabled");
        });
      });

      describe("successfully", () => {
        beforeEach(() => {
          cy.intercept("POST", `${Cypress.env("apiUrl")}/projects`, {
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
          cy.wait("@createProject")
            .its("response.statusCode")
            .should("eql", 201);
        });

        it("is expected to redirect to projects show page", () => {
          cy.url().should("include", "/projects/100");
        });

        it("is expected to display a success message", () => {
          cy.get("body").should("contain.text", "Your project was created");
        });
      });

      describe("unsuccessfully", () => {
        describe("with missing fields", () => {
          beforeEach(() => {
            cy.intercept("POST", `${Cypress.env("apiUrl")}/projects`, {
              fixture: "projectCreateErrorResponse.json",
              statusCode: 422,
            }).as("createProjectError");
            cy.getCy("project-title").type("My awesome project");
            cy.getCy("project-description").type("Yada yada...");
            cy.getCy("project-submit").click();
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

        describe("on network error", () => {
          beforeEach(() => {
            cy.intercept("POST", `${Cypress.env("apiUrl")}/projects`, {
              forceNetworkError: true,
            }).as("networkError");
            cy.getCy("project-title").type("My awesome project");
            cy.getCy("project-description").type("Yada yada...");
            cy.getCy("project-submit").click();
          });

          it("is expected to respond with a network error", () => {
            cy.wait("@networkError").should("have.property", "error");
          });

          it("is expected to remain on the create project page", () => {
            cy.url().should("include", "/projects/create");
          });

          it("is expected to inform the user something went wrong", () => {
            cy.get("body").should(
              "contain.text",
              "Network Error, please try again later..."
            );
          });
        });
      });
    });
  });
});
