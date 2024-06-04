import swissScores from '../fixtures/swiss_scores_regional4.json';

it('Check Round 1', () => {
	cy.visit('/');
	cy.viewport(1500, 1000);

	const values: any[] = [];
	const round1 = [
		'G2 Stride',
		'Cold',
		'Gen.G',
		'Cheers',
		'Luminosity Gaming',
		'Netherlamericanada',
		'OG',
		'Deleted XD',
		'TSM',
		'Snowmen',
		'M80',
		'Cloud 9',
		'Spacestation Gaming',
		'Shopify Rebellion',
		'Moist Esports',
		'NRG',
	];
	cy.get('[data-test-team]')
		.each(($el) => {
			values.push($el.attr('data-test-team'));
		})
		.then(() => {
			expect(values).to.deep.equal(round1);
		});
});

it('Check Round 2', () => {
	cy.visit('/');
	cy.viewport(1500, 1000);

	cy.get('[data-input-name="round1"]').then((inputs) => {
		let keyValue = 1;
		cy.wrap(inputs).each((input, index) => {
			const fixture = swissScores[`${keyValue}`];
			keyValue += 1;
			cy.wrap(input).clear();
			cy.wrap(input).type(fixture).blur();
		});
	});
	const values: (string | undefined)[] = [];
	const round2 = [
		'G2 Stride',
		'Spacestation Gaming',
		'Netherlamericanada',
		'Snowmen',
		'Gen.G',
		'Moist Esports',
		'OG',
		'M80',
		'Shopify Rebellion',
		'Cold',
		'TSM',
		'Luminosity Gaming',
		'NRG',
		'Cheers',
		'Cloud 9',
		'Deleted XD',
	];
	cy.get('[data-test-team]')
		.each(($el) => {
			values.push($el.attr('data-test-team'));
		})
		.then(() => {
			values.splice(0, 16);
			expect(values).to.deep.equal(round2);
		});
});
