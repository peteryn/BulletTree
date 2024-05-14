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

	matchups: Match[] = [];

	constructor() {
		for (let i = 0; i < this.teams.length; i += 2) {
			this.matchups.push({
				team1: this.teams[i],
				team2: this.teams[i + 1],
			});
		}
	}
}
