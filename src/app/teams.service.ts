import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TeamsService {
	teams = [
		'Spacestation',
		'Dignitas',
		'Gen.G Mobil1 Racing',
		'OG',
		'M80',
		'Cloud9',
		'G2 Stride',
		'Shopify Rebellion',
	];
	constructor() {}
	getAllTeams() {
		return this.teams;
	}
}
