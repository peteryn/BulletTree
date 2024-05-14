import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatchComponent } from './match/match.component';
import { Match } from './match';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, MatchComponent, CommonModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'bulletTree';

	team1 = 'Spacestation';
	team2 = 'Dignitas';

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

	semiFinalTeams: string[] = [];
	grandFinalTeams: string[] = [];

	quarterFinals: Match[] = [];
	semiFinals: Match[] = [];
	grandFinals: Match[] = [];

	constructor() {
		this.createMatches(this.teams, this.quarterFinals);
	}

	createMatches(teams: string[], matches: Match[]) {
		for (let i = 0; i < teams.length; i += 2) {
			matches.push({
				team1: teams[i],
				team2: teams[i + 1],
				team1Score: 0,
				team2Score: 0,
			});
		}
	}

	updateSemiFinals(winner: string) {
		// TODO: remove winner, if the winner changes
		this.semiFinalTeams.push(winner);

		if (this.semiFinalTeams.length === 4) {
			this.createMatches(this.semiFinalTeams, this.semiFinals);
		}
	}

	updateGrandFinals(winner: string) {
		this.grandFinalTeams.push(winner);
		if (this.grandFinalTeams.length === 2) {
			this.createMatches(this.grandFinalTeams, this.grandFinals);
		}
	}
}
