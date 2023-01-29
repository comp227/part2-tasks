describe('Task app', function() {
    it('front page can be opened', function() {
        cy.visit('http://localhost:3000');
        cy.contains('Tasks');
        cy.contains('Task app, Department of Computer Science, University of the Pacific 2023');
    });
});