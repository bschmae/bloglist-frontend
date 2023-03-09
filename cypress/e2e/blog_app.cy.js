describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'testUser1',
      username: 'testUser1',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('login');
  });

  it('Login form can be opened', function() {
    cy.contains('login').click();
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.contains('login').click()
    });
  
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testUser1');
      cy.get('#password').type('password');
      cy.get('#login-button').click()
      cy.contains('testUser1 logged in')
    });
  
    it('fails with incorrect credentials', function() {
      cy.get('#username').type('fakeuser');
      cy.get('#password').type('fakePassword');
      cy.get('#login-button').click()
      cy.contains('Invalid username or password')
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('testUser1');
      cy.get('#password').type('password');
      cy.get('#login-button').click()

      cy.get('#title').type('title');
      cy.get('#author').type('author');
      cy.get('#url').type('url');
      cy.contains('create new blog').click();

    });

    it('a blog can be created', function() {
      cy.contains('A new blog title by author has been added');

      cy.request('GET', 'http://localhost:3003/api/blogs/').as('blogs');

      cy.get('@blogs').should((response) => {
        const data = response.body
        expect(data).to.have.length(1)
      });
    });

    it('user can like a blog', function() {
      cy.contains('view').click();
      cy.get('#like-button').click();

      cy.contains('likes: 1');
    });

    it('user who created a blog can delete it', function() {
      cy.contains('view').click();
      cy.contains('remove').click();

      cy.request('GET', 'http://localhost:3003/api/blogs/').as('blogs');

      cy.get('@blogs').should((response) => {
        const data = response.body
        expect(data).to.have.length(0)
      });
    });
  });
});

