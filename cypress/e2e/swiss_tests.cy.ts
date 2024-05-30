import swissScores from '../fixtures/swiss_scores_regional5.json';
// swiss_scores_1 NA Regional #4 Edge Case
// swiss_scores_2 Default 3-0 for all teams

it('Autopopulate Swiss', () => {
    cy.visit('/swiss')
    cy.viewport(1500, 1000);

    // Ensure that inputs are available in the DOM
    cy.get('input[name^="team"]').should('exist').then((inputs) => {
        var keyValue = 1;
        cy.wrap(inputs).each((input, index) => {
            const fixture = swissScores[`${keyValue}`];
            keyValue+=1;
            cy.wrap(input).clear();
            cy.wrap(input).type(fixture);
        });
    });
});
