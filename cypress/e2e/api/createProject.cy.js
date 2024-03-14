import { faker } from '@faker-js/faker'

describe('Novo projeto', () => {
    it('Criar novo projeto', () => {
        const infoProject = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5)
        }
        cy.apiDeleteAllProjects()
        cy.apiCreateProject(infoProject)
            .then(response => {
                expect(response.status).to.eql(201)
                expect(response.body.name).to.eql(infoProject.name)
                expect(response.body.description).to.eql(infoProject.description)
            })
    })
})