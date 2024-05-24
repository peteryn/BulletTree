import { Injectable } from '@angular/core';
import { Match } from './match';

@Injectable({
	providedIn: 'root',
})
export class TeamsService {
	teams = [
		'Karmine Corp',
		'Limitless',
		'BDS',
		'Elevate',
		'G2',
		'Pioneers',
		'Vitality',
		'Complexity',
		'Gen.G',
		'PWR',
		'Gentlemates',
		'Rule One',
		'Falcons',
		'OG',
		'Luminosity',
		'Furia',
	];
	constructor() {}

	getAllTeams() {
		return this.teams;
	}

	get8Teams() {
		const res = [];
		for (let i = 0; i < 8; i++) {
			res.push(this.teams[i]);
		}
		return res;
	}

	createMatches() {
		const matches: Match[] = [];
		for (let i = 0; i < this.teams.length; i += 2) {
			matches.push({
				team1: this.teams[i],
				team2: this.teams[i + 1],
				team1Score: 0,
				team2Score: 0,
			});
		}
		return matches;
	}
}
