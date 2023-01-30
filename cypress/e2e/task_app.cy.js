describe('Task app', function() {
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND_API')}/testing/reset`);
        const user = {
            name: 'Pacific Tests',
            username: 'test',
            password: 'pacific'
        };
        cy.request('POST', `${Cypress.env('BACKEND_API')}/users/`, user);
        cy.visit('');
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

    it('login fails with wrong password', function() {
        cy.contains('login').click();
        cy.get('#username').type('root');
        cy.get('#password').type('wrong');
        cy.get('#login-button').click();

        cy.get('.error')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'background-color', 'rgb(156, 43, 46)')
            .and('have.css', 'border-style', 'solid');

        cy.get('html').should('not.contain', 'Pacific Tests logged in');
    });

    describe('when logged in', function() {
        beforeEach(function () {
            cy.login({ username: 'test', password: 'pacific' });
        });

        it('a new task can be created', function () {
            cy.contains('new task').click();
            cy.get('#new-task').type('a task created by cypress');
            cy.contains('save').click();

            cy.contains('a task created by cypress');
        });

        describe('and a task exists', function () {
            beforeEach(function () {
                cy.createTask({
                    content: 'another task cypress',
                    important: false
                });
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