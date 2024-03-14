describe('Logout', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })
  it('Validar Logout', () => {
    cy.logout()
    cy.url().should('be.eql', `${Cypress.config('baseUrl')}/users/sign_in`)
  })
})
