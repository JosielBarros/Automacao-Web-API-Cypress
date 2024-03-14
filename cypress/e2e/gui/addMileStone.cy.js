import { faker } from '@faker-js/faker'

describe('MileStone', () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
        }
    }
    const mileStone = {
        title: faker.random.words(2)
    }
    beforeEach(() => {
        cy.login()
        cy.apiDeleteAllProjects()
        cy.apiCreateIssue(issue)
            .then(resp => {
                cy.apiCreateMileStone(mileStone, resp.body.project_id)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${resp.body.iid}`)
            })
    })
    it('Adicionar milestone a issue', () => {
        cy.guiAddMileStone(mileStone)
        // cy.contains('.milestone .value a', mileStone.title).should('be.visible')
        cy.get('.milestone .value a').should('have.text', mileStone.title)
    })
})