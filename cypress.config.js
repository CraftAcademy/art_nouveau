const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    excludeSpecPattern: process.env.CI ? ['cypress/e2e/all.cy.js'] : []
  },
});
