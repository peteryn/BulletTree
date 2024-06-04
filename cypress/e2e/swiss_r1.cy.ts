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
