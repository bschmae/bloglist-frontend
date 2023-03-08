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
});

