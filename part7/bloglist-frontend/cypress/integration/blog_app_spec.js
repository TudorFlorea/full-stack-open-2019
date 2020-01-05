describe('Login ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000/login')
    })
    it('page can be opened', function() {
        cy.contains('Login')
    })

    it('can login with an existing user', function() {
        const user = {
            username: 'tudor',
            password: 'tudor',
            name: 'Tudor'
        }

        cy.get('[data-cy=login-username]').type(user.username)
        cy.get('[data-cy=login-password]').type(user.password)
        cy.get('[data-cy=login-submit]').click()
        cy.get('[data-cy=user-details]').contains(`${user.name} logged in`)
        
    })
})

describe('Hompege ', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000')
    })

    it('can be opened an contains the "Blog app" title', function() {
        cy.get('[data-cy=heading]').contains("Blog app")
    })
});