import { faker } from '@faker-js/faker'

describe('Label', () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
        }
    }
    const label = {
        name: faker.word.adjective(),
        color: '#ccc'
    }
    beforeEach(() => {
        cy.login()
        cy.apiDeleteAllProjects()
        cy.apiCreateIssue(issue)
            .then(resp => {
                cy.apiCreateLabel(label, resp.body.project_id)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${resp.body.iid}`)
            })
    })
    it('Adicionar Label a issue', () => {
        cy.guiAddLabel(label)
        cy.get('.qa-labels-block').should('contain', label.name)
        cy.get('.qa-labels-block span')
            .should('have.text', `${label.name}`)
    })
})