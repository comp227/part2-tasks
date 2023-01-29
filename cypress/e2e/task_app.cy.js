describe('Task app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            name: 'Pacific Tests',
            username: 'test',
            password: 'pacific'
        };
        cy.request('POST', 'http://localhost:3001/api/users/', user);
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
        cy.get('#username').type('test');
        cy.get('#password').type('pacific');
        cy.get('#login-button').click();

        cy.contains('Pacific Tests logged in');
    });

    it.only('login fails with wrong password', function() {
        cy.contains('login').click();
        cy.get('#username').type('root');
        cy.get('#password').type('wrong');
        cy.get('#login-button').click();

        cy.get('.error').should('contain', 'Wrong credentials');
    });

    describe('when logged in', function() {
        beforeEach(function () {
            cy.contains('login').click();
            cy.get('#username').type('test');
            cy.get('#password').type('pacific');
            cy.get('#login-button').click();
        });

        it('a new task can be created', function () {
            cy.contains('new task').click();
            cy.get('#new-task').type('a task created by cypress');
            cy.contains('save').click();

            cy.contains('a task created by cypress');
        });

        describe('and a task exists', function () {
            beforeEach(function () {
                cy.contains('new task').click();
                cy.get('#new-task').type('another task cypress');
                cy.contains('save').click();
            });

            it('it can be made important', function () {
                cy.contains('another task cypress')
                    .contains('make important')
                    .click();

                cy.contains('another task cypress')
                    .contains('make not important');
            });
        });
    });
});