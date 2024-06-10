import na4 from '../fixtures/swiss_scores_regional4.json';
import na5 from '../fixtures/swiss_scores_regional5.json';
import na6 from '../fixtures/swiss_scores_regional6.json';

function getAndCheck(
	swissScores: any,
	r1: string[],
	r2: string[],
	r3: string[],
	r4: string[],
	r5: string[],
	qf: string[],
	sf: string[],
	gf: string[]
) {
	const values: (string | undefined)[] = [];
	cy.get('input[name^="team"]')
		.should('exist')
		.then((inputs) => {
			var keyValue = 1;
			cy.wrap(inputs).each((input, index) => {
				const fixture = swissScores[`${keyValue}`];
				keyValue += 1;
				cy.wrap(input).clear();
				cy.wrap(input).type(fixture).blur();
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

			expect(testR1).to.deep.equal(r1);
			expect(testR2).to.deep.equal(r2);
			expect(testR3).to.deep.equal(r3);
			expect(testR4).to.deep.equal(r4);
			expect(testR5).to.deep.equal(r5);
			expect(testQuarterFinals).to.deep.equal(qf);
			expect(testSemiFinals).to.deep.equal(sf);
			expect(testFinals).to.deep.equal(gf);
		});
}

it('North American Open Qualifer 4', () => {
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
		'Cloud9',
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
		'Cloud9',
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
		'Cloud9',
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
		'Cloud9',
		'NRG',
		'Deleted XD',
		'Luminosity Gaming',
		'Moist Esports',
		'Netherlamericanada',
		'TSM',
	];
	const round5 = ['Gen.G', 'Luminosity Gaming', 'Cloud9', 'NRG', 'M80', 'TSM'];
	const quarterFinals = [
		'G2 Stride',
		'M80',
		'OG',
		'Spacestation Gaming',
		'Snowmen',
		'Cloud9',
		'Shopify Rebellion',
		'Gen.G',
	];
	const semiFinals = ['G2 Stride', 'Spacestation Gaming', 'Snowmen', 'Gen.G'];
	const finals = ['G2 Stride', 'Gen.G'];
	cy.visit('/bracket/na4');
	cy.viewport(1500, 1000);
	getAndCheck(na4, round1, round2, round3, round4, round5, quarterFinals, semiFinals, finals);
});

it('North American Open Qualifer 5', () => {
	const round1 = [
		'G2 Stride',
		'BDW',
		'Gen.G',
		'Spate Esports',
		'Luminosity Gaming',
		'Netherlamericanada',
		'OG',
		'Dignitas',
		'Spacestation Gaming',
		'NRG',
		'M80',
		'Cloud9',
		'TSM',
		'Shopify Rebellion',
		'Snowmen',
		'Moist Esports',
	];
	const round2 = [
		'G2 Stride',
		'M80',
		'Gen.G',
		'OG',
		'Luminosity Gaming',
		'Snowmen',
		'Spacestation Gaming',
		'TSM',
		'Cloud9',
		'BDW',
		'Dignitas',
		'Spate Esports',
		'Moist Esports',
		'Netherlamericanada',
		'Shopify Rebellion',
		'NRG',
	];
	const round3 = [
		'Gen.G',
		'M80',
		'Luminosity Gaming',
		'Spacestation Gaming',
		'G2 Stride',
		'Netherlamericanada',
		'TSM',
		'Cloud9',
		'Snowmen',
		'Dignitas',
		'OG',
		'Shopify Rebellion',
		'Moist Esports',
		'Spate Esports',
		'NRG',
		'BDW',
	];
	const round4 = [
		'Gen.G',
		'Snowmen',
		'Luminosity Gaming',
		'OG',
		'G2 Stride',
		'TSM',
		'Dignitas',
		'NRG',
		'Shopify Rebellion',
		'Moist Esports',
		'Cloud9',
		'Netherlamericanada',
	];
	const round5 = [
		'Luminosity Gaming',
		'Cloud9',
		'Snowmen',
		'Shopify Rebellion',
		'TSM',
		'Dignitas',
	];
	const quarterFinals = [
		'Spacestation Gaming',
		'Dignitas',
		'Gen.G',
		'OG',
		'M80',
		'Cloud9',
		'G2 Stride',
		'Shopify Rebellion',
	];
	const semiFinals = ['Spacestation Gaming', 'OG', 'Cloud9', 'G2 Stride'];
	const finals = ['Spacestation Gaming', 'G2 Stride'];
	cy.visit('/bracket/na5');
	cy.viewport(1500, 1000);
	getAndCheck(na5, round1, round2, round3, round4, round5, quarterFinals, semiFinals, finals);
});

it('North American Open Qualifer 6', () => {
	const round1 = [
		'G2 Stride',
		'Incorrect',
		'Gen.G',
		'GBuffo',
		'OG',
		'Zero2One',
		'Spacestation Gaming',
		'Spate Esports',
		'Luminosity Gaming',
		'NRG',
		'M80',
		'Moist Esports',
		'Cloud9',
		'Dignitas',
		'Shopify Rebellion',
		'Snowmen',
	];
	const round2 = [
		'G2 Stride',
		'Moist Esports',
		'Gen.G',
		'Shopify Rebellion',
		'OG',
		'Dignitas',
		'Spacestation Gaming',
		'Luminosity Gaming',
		'M80',
		'Incorrect',
		'Snowmen',
		'GBuffo',
		'Cloud9',
		'Zero2One',
		'NRG',
		'Spate Esports',
	];
	const round3 = [
		'Spacestation Gaming',
		'Shopify Rebellion',
		'OG',
		'G2 Stride',
		'Gen.G',
		'Cloud9',
		'Dignitas',
		'NRG',
		'Moist Esports',
		'Snowmen',
		'Luminosity Gaming',
		'M80',
		'Zero2One',
		'Incorrect',
		'Spate Esports',
		'GBuffo',
	];
	const round4 = [
		'Spacestation Gaming',
		'Dignitas',
		'OG',
		'Luminosity Gaming',
		'Gen.G',
		'Moist Esports',
		'M80',
		'GBuffo',
		'NRG', // this was supposed to be above M80 vs GBF
		'Incorrect',
		'Snowmen',
		'Cloud9',
	];
	const round5 = ['Moist Esports', 'NRG', 'Luminosity Gaming', 'Cloud9', 'Dignitas', 'M80'];
	const quarterFinals = [
		'G2 Stride',
		'Dignitas',
		'Spacestation Gaming',
		'OG',
		'Shopify Rebellion',
		'Luminosity Gaming',
		'Gen.G',
		'Moist Esports',
	];
	const semiFinals = ['G2 Stride', 'OG', 'Shopify Rebellion', 'Moist Esports'];
	const finals = ['G2 Stride', 'Shopify Rebellion'];
	cy.visit('/bracket/na6');
	cy.viewport(1500, 1000);
	getAndCheck(na6, round1, round2, round3, round4, round5, quarterFinals, semiFinals, finals);
});
