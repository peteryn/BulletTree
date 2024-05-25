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
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},

		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},

		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
			gameDifferential: 0,
		},
		{
			name: 'G2 Stide',
			logo: './assets/images/g2.png',
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
