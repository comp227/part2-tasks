describe('Task app', function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000');
    });

    it('front page can be opened', function() {
        cy.contains('Tasks');
        cy.contains('Task app, Department of Computer Science, University of the Pacific 2023');
    });

    it('login form can be opened', function() {
        cy.contains('login').click();
    });

    it('user can login', function () {
        cy.contains('login').click();
        cy.get('#username').type('root');
        cy.get('#password').type('tigers');
        cy.get('#login-button').click();

        cy.contains('Superuser logged in');
    });
});