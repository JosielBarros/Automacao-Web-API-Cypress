import { faker } from '@faker-js/faker'

describe('Gestão de Issues', () => {
    const issue = {
        name: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
    }
    beforeEach(() => {
        cy.apiDeleteAllProjects()
        cy.apiCreateProject(issue.project)
        cy.login()
    })

    it('Cadastrar Issue', () => {
        cy.guiCreateIssue(issue)
        cy.contains('.qa-title', issue.name).should('be.visible')
        cy.contains('.description .md', issue.description).should('be.visible')
    })
})