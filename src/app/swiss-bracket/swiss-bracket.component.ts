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

	constructor() {
		for (let i = 0; i < 4; i++) {
			this.round2upper.push({
				team1Score: 0,
				team2Score: 0,
				matchId: Math.floor(Math.random() * 100000),
				team1: undefined,
				team2: undefined,
			});
		}
	}

	update(match: Match) {
		// note: this won't work when there are multiple layers
		// may need to create a game diff attribute for each round
		match.team1!.gameDifferential = match.team1Score - match.team2Score;
		match.team2!.gameDifferential = match.team2Score - match.team1Score;
		if (this.scoreEnteredInAll(this.round1)) {
			// calculate next swiss round
			this.calculateRound2(this.round1);
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
		const winnersSorted = this.gameDiffSort(winners);
		this.createMatches(winnersSorted, this.round2upper);
		console.log(winnersSorted);
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

	gameDiffSort(teams: Team[]) {
		return teams.sort(
			(a, b) =>
				b.gameDifferential - a.gameDifferential ||
				a.initialSeed - b.initialSeed
		);
	}

	createMatches(teams: Team[], matches: Match[]) {
		let l = 0;
		let r = teams.length - 1;
		let i = 0;
		while (l < r) {
			matches[i].team1 = teams[l];
			matches[i].team2 = teams[r];
			l++;
			r--;
			i++;
		}
	}
}
