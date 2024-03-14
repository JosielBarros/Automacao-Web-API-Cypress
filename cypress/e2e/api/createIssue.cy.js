import { faker } from '@faker-js/faker'

describe('Gestão de Issues', () => {
    beforeEach(() => {
        cy.apiDeleteAllProjects()
    })
    it('Cadastrar Issue', () => {
        const issue = {
            title: `issue-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            project: {
                name: `project-${faker.datatype.uuid()}`,
                description: faker.random.words(5),
            }
        }
        cy.apiCreateIssue(issue)
            .then(res => {
                expect(res.body.title).to.eql(issue.title)
                expect(res.body.description).to.eql(issue.description)
            })
    })
})