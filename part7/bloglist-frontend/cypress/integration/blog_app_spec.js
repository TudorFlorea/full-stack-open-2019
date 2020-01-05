describe('Signup ', function() {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000/signup')
    });

    it(' can visit signup page', function() {
        cy.get('[data-cy=heading]').contains("Signup")
    });

    it(' can create a user with the signup page', function() {
        const user = {
            username: 'tudor',
            password: 'tudor',
            name: 'Tudor Florea'
        }

        cy.get('[data-cy=signup-name]').type(user.name)
        cy.get('[data-cy=signup-username]').type(user.username)
        cy.get('[data-cy=signup-password]').type(user.password)
        cy.get('[data-cy=signup-submit]').click()
        cy.wait(2000)

        cy.visit('http://localhost:3000/users')
        cy.contains(user.name, { timeout: 4000 });

    });
})

describe('Login ', function() {
    const user = {
        username: 'tudor',
        password: 'tudor',
        name: 'Tudor Florea'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000/login')
    })

    it('page can be opened', function() {
        cy.contains('Login')
    })

    it('can login with an existing user', function() {

        cy.get('[data-cy=login-username]').type(user.username)
        cy.get('[data-cy=login-password]').type(user.password)
        cy.get('[data-cy=login-submit]').click()
        cy.get('[data-cy=user-details]').contains(`${user.name} logged in`)
        
    })
})

describe('Hompege ', function() {

    const user = {
        username: 'tudor',
        password: 'tudor',
        name: 'Tudor Florea'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })

    it('can be opened an contains the "Blog app" title', function() {
        cy.get('[data-cy=heading]').contains("Blog app")
    })
});

describe('When logged in ', function() {
    const user = {
        username: 'tudor',
        password: 'tudor',
        name: 'Tudor Florea'
    }

    const blog = {
        title: 'blog title',
        author: 'blog author',
        url: 'https://google.com'
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000/login')
        cy.get('[data-cy=login-username]').type(user.username)
        cy.get('[data-cy=login-password]').type(user.password)
        cy.get('[data-cy=login-submit]').click()
    })

    it('can see and open the add blog form', function() {
        cy.get('[data-cy=add-blog-show]').contains('New blog')
        cy.get('[data-cy=add-blog-show]').click()
        cy.get('[data-cy=add-blog-submit]').contains('Create blog')
        cy.get('[data-cy=add-blog-cancel]').contains('Cancel')
    })

    it('can add a blog post', function() {
        cy.get('[data-cy=add-blog-show]').click()
        cy.get('[data-cy=add-blog-title]').type(blog.title)
        cy.get('[data-cy=add-blog-author]').type(blog.author)
        cy.get('[data-cy=add-blog-url]').type(blog.url)
        cy.get('[data-cy=add-blog-submit]').click()
        cy.wait(2000)
        cy.contains(`${blog.title} ${blog.author}`)
    });

});

describe('When logged in with a blog post created ', function() {
    const user = {
        username: 'tudor',
        password: 'tudor',
        name: 'Tudor Florea'
    }

    const blog = {
        title: 'blog title',
        author: 'blog author',
        url: 'https://google.com'
    }

    const comment = {
        value: "comment..."
    }

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000/login')
        cy.get('[data-cy=login-username]').type(user.username)
        cy.get('[data-cy=login-password]').type(user.password)
        cy.get('[data-cy=login-submit]').click()
        cy.get('[data-cy=add-blog-show]').click()
        cy.get('[data-cy=add-blog-title]').type(blog.title)
        cy.get('[data-cy=add-blog-author]').type(blog.author)
        cy.get('[data-cy=add-blog-url]').type(blog.url)
        cy.get('[data-cy=add-blog-submit]').click()
        cy.wait(2000)
    })

    it('can visit a blog post', function() {
        cy.get('.card-body').contains(`${blog.title} ${blog.author}`).click()
        cy.get('[data-cy=heading]').contains(blog.title)
        cy.get('[data-cy=blog-url]').contains(blog.url)
        cy.get('[data-cy=blog-likes]').contains('0 likes')
        cy.get('[data-cy=blog-user]').contains(user.name)
        cy.get('[data-cy=blog-remove]').contains('remove')
    })

    it('can visit and like a blog post', function() {
        cy.get('.card-body').contains(`${blog.title} ${blog.author}`).click()
        cy.get('[data-cy=blog-likes]').contains('0 likes')
        cy.get('[data-cy=blog-like-button]').click()
        cy.get('[data-cy=blog-likes]').contains('1 likes')  
    })

    it('can add a comment to a blog post', function() {
        cy.get('.card-body').contains(`${blog.title} ${blog.author}`).click()
        cy.get('[data-cy=add-comment-value]').type(comment.value)
        cy.get('[data-cy=add-comment-submit]').click()
        cy.get('[data-cy=blog-comments]').contains(comment.value)
    })
})