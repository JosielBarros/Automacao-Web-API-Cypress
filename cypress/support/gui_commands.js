Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit('/users/sign_in')
        cy.get('#user_login').type(user)
        cy.get('#user_password').type(password, { log: false })
        cy.get('.btn.btn-success').click()
    }
    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
          .should('not.eq', '/users/sign_in')
    }
    const options = {
        cacheAcrossSpecs: true,
        validate,
    }
    debugger
    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
})
Cypress.Commands.add('logout', () => {
    cy.get('.header-user-dropdown-toggle').click()
    cy.get('.sign-out-link').click()
})
Cypress.Commands.add('guiCreateProject', (infoProject) => {
    cy.visit('/projects/new')
    cy.get('#project_name').type(infoProject.name)
    cy.get('#project_description').type(infoProject.description)
    cy.get('#project_initialize_with_readme').check()
    cy.contains('Create project').click()
})
Cypress.Commands.add('guiCreateIssue', (infoIssue) => {
    cy.visit(`${Cypress.env('user_name')}/${infoIssue.project.name}/issues/new`)
    cy.get('#issue_title').type(infoIssue.name)
    cy.get('#issue_description').type(infoIssue.description)
    cy.get('#issue_confidential').check()
    cy.get('.qa-issuable-create-button').click()
})
Cypress.Commands.add('guiAddLabel', (label) => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains('a', `${ label.name}`).click()
    cy.get('body').click()
})
Cypress.Commands.add('guiAddMileStone', (mileStone) => {
    cy.get('.milestone .edit-link').click()
    cy.contains('a', `${ mileStone.title}`).click()
})
