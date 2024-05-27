import { Component, inject } from '@angular/core';
import { Team } from '../team';
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
	teams = this.teamsService.getAllTeams();
	round1: Match[] = this.teamsService.createMatches();
	round2upper: Match[] = [];
	round2lower: Match[] = [];
	round3upper: Match[] = [];
	round3middle: Match[] = [];
	round3lower: Match[] = [];
	round4upper: Match[] = [];
	round4lower: Match[] = [];
	round5: Match[] = [];

	constructor() {}

	update(match: Match) {
		console.log('score update');
		// note: this won't work when there are multiple layers
		// may need to create a game diff attribute for each round
		match.team1!.gameDifferential = match.team1Score - match.team2Score;
		match.team2!.gameDifferential = match.team2Score - match.team1Score;
		if (this.scoreEnteredInAll(this.round1)) {
			// calculate next swiss round
		}
	}

	scoreEnteredInAll(round: Match[]): boolean {
		for (let match of round) {
			if (match.team1Score === match.team2Score) {
				return false;
			}
		}
		return true;
	}

	calculateRound2(round1: Match[]) {
		let winners: Team[] = [];
		let losers: Team[] = [];
		[winners, losers] = this.getWinnersAndLosers(round1);
	}

	getWinnersAndLosers(round: Match[]) {
		const winners: Team[] = [];
		const losers: Team[] = [];
		for (let match of round) {
			if (match.team1Score > match.team2Score) {
				winners.push(match.team1!);
				losers.push(match.team2!);
			} else {
				winners.push(match.team2!);
				losers.push(match.team1!);
			}
		}
		return [winners, losers];
	}
}
