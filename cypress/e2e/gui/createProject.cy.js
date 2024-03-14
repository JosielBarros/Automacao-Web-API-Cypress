import { faker } from '@faker-js/faker'

describe('Novo projeto', () => {
    beforeEach(() => {
        cy.apiDeleteAllProjects()
        cy.login()
    })
    it('Criar novo projeto', () => {
        const infoProject = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
        cy.guiCreateProject(infoProject)
        cy.url().should('be.eql', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${infoProject.name}`)
        cy.contains(infoProject.name).should('be.visible')
        cy.contains(infoProject.description).should('be.visible')
    })
})