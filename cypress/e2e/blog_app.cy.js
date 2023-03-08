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
  })

  it('Login form is shown', function() {
    cy.contains('login');
  });

  it('Login form can be opened', function() {
    cy.contains('login').click();
  })
});