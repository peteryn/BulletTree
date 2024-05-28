import { Injectable } from '@angular/core';
import { Match } from './match';
import { Team } from './team';

@Injectable({
	providedIn: 'root',
})
export class TeamsService {
	teams: Team[] = [];
	na_qual6: Team[] = [
		{
			name: 'G2 Stide',
			initialSeed: 1,
			logo: './assets/images/g2.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Cold',
			initialSeed: 16,
			logo: './assets/images/default.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Gen.G',
			initialSeed: 2,
			logo: './assets/images/geng.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Cheers',
			initialSeed: 15,
			logo: './assets/images/cheers.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},

		{
			name: 'Luminosity Gaming',
			initialSeed: 3,
			logo: './assets/images/luminosity.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Netherlamericanada',
			initialSeed: 14,
			logo: './assets/images/netherlamericanada.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'OG',
			initialSeed: 4,
			logo: './assets/images/og.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Deleted XD',
			initialSeed: 13,
			logo: './assets/images/deleted_xd.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},

		{
			name: 'TSM',
			initialSeed: 5,
			logo: './assets/images/tsm.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Snowmen',
			initialSeed: 12,
			logo: './assets/images/snowmen.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'M80',
			initialSeed: 6,
			logo: './assets/images/m80.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Cloud 9',
			initialSeed: 11,
			logo: './assets/images/cloud9.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Spacestation Gaming',
			initialSeed: 7,
			logo: './assets/images/ssg.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Shopify Rebellion',
			logo: './assets/images/shopify.png',
			initialSeed: 10,
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'Moist Esports',
			initialSeed: 8,
			logo: './assets/images/moist.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
		{
			name: 'NRG',
			initialSeed: 9,
			logo: './assets/images/nrg.png',
			gameDifferential: 0,
			round1Differential: 0,
			round2Differential: 0,
			round3Differential: 0,
			round4Differential: 0,
			round5Differential: 0,
		},
	];
	constructor() {
		this.teams = this.na_qual6;
	}

	getAllTeams(): Team[] {
		return this.teams;
	}

	get8Teams(): Team[] {
		const res = [];
		for (let i = 0; i < 8; i++) {
			res.push(this.teams[i]);
		}
		return res;
	}

	createMatches(): Match[] {
		const matches: Match[] = [];
		for (let i = 0; i < this.teams.length; i += 2) {
			matches.push({
				team1: this.teams[i],
				team2: this.teams[i + 1],
				team1Score: 0,
				team2Score: 0,
				matchId: Math.floor(Math.random() * 100000),
			});
		}
		return matches;
	}
}
