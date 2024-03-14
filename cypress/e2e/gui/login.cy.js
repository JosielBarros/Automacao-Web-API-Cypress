describe('Login', () => {
    it('Validar login', () => {
      const user = Cypress.env('user_name')
      const password = Cypress.env('user_password')
      const options = { cacheSession: false }

      cy.login(user, password, options)
      cy.get('.header-user-dropdown-toggle').should('be.visible')
    })
})