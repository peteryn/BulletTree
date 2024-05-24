import { Component, inject } from '@angular/core';
import { Match } from '../match';
import { TeamsService } from '../teams.service';
import { MatchComponent } from '../match/match.component';

@Component({
	selector: 'app-swiss-bracket',
	standalone: true,
	imports: [MatchComponent],
	templateUrl: './swiss-bracket.component.html',
	styleUrl: './swiss-bracket.component.css',
})
export class SwissBracketComponent {
	teamsService = inject(TeamsService);
	round1: Match[] = this.teamsService.createMatches();

	constructor() {
		console.log(this.round1);
	}
}
