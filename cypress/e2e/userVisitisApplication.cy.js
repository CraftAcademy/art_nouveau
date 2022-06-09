describe('User visiting the application', () => {
  it('is expected to see "Hello World"', () => {
    cy.visit('http://localhost:3000')
    cy.get('body').should('contain.text', 'Hello World')
  })
})