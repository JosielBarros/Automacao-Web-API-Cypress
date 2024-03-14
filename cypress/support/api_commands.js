const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('apiCreateProject', (infoProject) => {
    cy.request({
        url: '/api/v4/projects/',
        method: 'POST',
        body: { name: infoProject.name, description: infoProject.description, initialize_with_readme: true },
        headers: { Authorization: accessToken }
    })
})
Cypress.Commands.add('apiGetAllProjects', () => {
    cy.request({
        url: '/api/v4/projects/',
        method: 'GET',
        headers: { Authorization: accessToken }
    }).then(response => {
        expect(response.status).to.eql(200)
    })
})
Cypress.Commands.add('apiDeleteAllProjects', () => {
    cy.apiGetAllProjects().then(res => {
        res.body.forEach(project => {
            cy.request({
                url: `/api/v4/projects/${project.id}`,
                method: 'DELETE',
                headers: { Authorization: accessToken }
            }).then(response => {
                expect(response.status).to.eql(202)
            })
        })
    })
})
Cypress.Commands.add('apiCreateIssue', (issue) => {
    cy.apiCreateProject(issue.project)
        .then(res => {
            cy.request({
                url: `/api/v4/projects/${res.body.id}/issues`,
                method: 'POST',
                body: { title: issue.title, description: issue.description },
                headers: { Authorization: accessToken }
            }).then(res => {
                expect(res.status).to.eql(201)
            })
        })
})
Cypress.Commands.add('apiCreateLabel', (label, projectId) => {
    cy.request({
        url: `/api/v4/projects/${projectId}/labels`,
        method: 'POST',
        body: { name: label.name, color: label.color },
        headers: { Authorization: accessToken }
    }).then(res => {
        expect(res.status).to.eql(201)
    })
})
Cypress.Commands.add('apiCreateMileStone', (mileStone, projectId) => {
    cy.request({
        url: `/api/v4/projects/${projectId}/milestones`,
        method: 'POST',
        body: { title: mileStone.title },
        headers: { Authorization: accessToken }
    }).then(res => {
        expect(res.status).to.eql(201)
    })
})
