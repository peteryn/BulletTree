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
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'Cold',
			logo: './assets/images/default.png',
			gameDifferential: 0,
		},
		{
			name: 'Gen.G',
			logo: './assets/images/geng.png',
			gameDifferential: 0,
		},
		{
			name: 'Cheers',
			logo: './assets/images/cheers.png',
			gameDifferential: 0,
		},

		{
			name: 'Luminosity Gaming',
			logo: './assets/images/luminosity.png',
			gameDifferential: 0,
		},
		{
			name: 'Netherlamericanada',
			logo: './assets/images/netherlamericanada.png',
			gameDifferential: 0,
		},
		{
			name: 'OG',
			logo: './assets/images/og.png',
			gameDifferential: 0,
		},
		{
			name: 'Deleted XD',
			logo: './assets/images/deleted_xd.png',
			gameDifferential: 0,
		},

		{
			name: 'TSM',
			logo: './assets/images/tsm.png',
			gameDifferential: 0,
		},
		{
			name: 'Snowmen',
			logo: './assets/images/snowmen.png',
			gameDifferential: 0,
		},
		{
			name: 'M80',
			logo: './assets/images/m80.png',
			gameDifferential: 0,
		},
		{
			name: 'Cloud 9',
			logo: './assets/images/cloud9.png',
			gameDifferential: 0,
		},
		{
			name: 'Spacestation Gaming',
			logo: './assets/images/ssg.png',
			gameDifferential: 0,
		},
		{
			name: 'Shopify Rebellion',
			logo: './assets/images/shopify.png',
			gameDifferential: 0,
		},
		{
			name: 'Moist Esports',
			logo: './assets/images/moist.png',
			gameDifferential: 0,
		},
		{
			name: 'NRG',
			logo: './assets/images/nrg.png',
			gameDifferential: 0,
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
