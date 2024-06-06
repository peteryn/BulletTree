import swissScores from '../fixtures/swiss_scores_regional4.json';

it('Check Round 1', () => {
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
	const round3 = [
		'G2 Stride',
		'M80',
		'Gen.G',
		'Snowmen',
		'OG',
		'Luminosity Gaming',
		'Netherlamericanada',
		'Cloud 9',
		'Spacestation Gaming',
		'NRG',
		'Moist Esports',
		'Shopify Rebellion',
		'TSM',
		'Cold',
		'Deleted XD',
		'Cheers',
	];
	const round4 = [
		'Gen.G',
		'OG',
		'M80',
		'Spacestation Gaming',
		'Shopify Rebellion',
		'Cloud 9',
		'NRG',
		'Deleted XD',
		'Luminosity Gaming',
		'Moist Esports',
		'Netherlamericanada',
		'TSM',
	];
	const round5 = ['Gen.G', 'Luminosity Gaming', 'Cloud 9', 'NRG', 'M80', 'TSM'];
	const quarterFinals = [
		'G2 Stride',
		'M80',
		'OG',
		'Spacestation Gaming',
		'Snowmen',
		'Cloud 9',
		'Shopify Rebellion',
		'Gen.G',
	];
	const semiFinals = ['G2 Stride', 'Spacestation Gaming', 'Snowmen', 'Gen.G'];
	const finals = ['G2 Stride', 'Gen.G'];
	cy.visit('/bracket/na4');
	cy.viewport(1500, 1000);

	const values: (string | undefined)[] = [];
	// cy.get('[data-test-team]')
	// 	.each(($el) => {
	// 		values.push($el.attr('data-test-team'));
	// 	})
	// 	.then(() => {
	// 		expect(values).to.deep.equal(round1);
	// 	});

	cy.get('input[name^="team"]')
		.should('exist')
		.then((inputs) => {
			var keyValue = 1;
			cy.wrap(inputs).each((input, index) => {
				const fixture = swissScores[`${keyValue}`];
				keyValue += 1;
				cy.wrap(input).clear();
				cy.wrap(input).type(fixture);
			});
		});

	cy.get('[data-test-team]')
		.each(($el) => {
			values.push($el.attr('data-test-team'));
		})
		.then(() => {
			const testR1 = values.splice(0, 16);
			const testR2 = values.splice(0, 16);
			const testR3 = values.splice(0, 16);
			const testR4 = values.splice(0, 12);
			const testR5 = values.splice(0, 6);
			const testQuarterFinals = values.splice(0, 8);
			const testSemiFinals = values.splice(0, 4);
			const testFinals = values.splice(0, 2);

			expect(testR1).to.deep.equal(round1);
			expect(testR2).to.deep.equal(round2);
			expect(testR3).to.deep.equal(round3);
			expect(testR4).to.deep.equal(round4);
			expect(testR5).to.deep.equal(round5);
			expect(testQuarterFinals).to.deep.equal(quarterFinals);
			expect(testSemiFinals).to.deep.equal(semiFinals);
			expect(testFinals).to.deep.equal(finals);
		});
});
