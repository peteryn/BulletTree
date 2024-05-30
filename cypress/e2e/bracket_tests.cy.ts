import bracketScores from '../fixtures/bracket_scores.json';

it('Autopopulate Bracket', () => {
    cy.visit('/single-elim')
    cy.viewport(1500, 1000);

    // Ensure that inputs are available in the DOM
    cy.get('input[name^="team"]').should('exist').then((inputs) => {
        var keyValue = 1;
        cy.wrap(inputs).each((input, index) => {
            const fixture = bracketScores[`${keyValue}`];
            keyValue+=1;
            cy.wrap(input).clear();
            cy.wrap(input).type(fixture);
        });
    });
});
