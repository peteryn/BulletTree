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
			this.round2upper.push(this.createEmptyMatch());
			this.round2lower.push(this.createEmptyMatch());
			this.round3middle.push(this.createEmptyMatch());
		}

		for (let i = 0; i < 3; i++) {
			this.round4upper.push(this.createEmptyMatch());
			this.round4lower.push(this.createEmptyMatch());
			this.round5.push(this.createEmptyMatch());
		}

		for (let i = 0; i < 2; i++) {
			this.round3upper.push(this.createEmptyMatch());
			this.round3lower.push(this.createEmptyMatch());
		}
	}

	createEmptyMatch(): Match {
		return {
			team1: undefined,
			team2: undefined,
			team1Score: 0,
			team2Score: 0,
			matchId: Math.floor(Math.random() * 100000),
		};
	}

	update(match: Match) {
		// note: this won't work when there are multiple layers
		// may need to create a game diff attribute for each round
		match.team1!.round1Differential = match.team1Score - match.team2Score;
		match.team2!.round1Differential = match.team2Score - match.team1Score;
		if (this.scoreEnteredInAll(this.round1)) {
			// calculate next swiss round
			this.calculateRound2(this.round1);
		}
	}

	updateRound2(match: Match) {
		match.team1!.round1Differential = match.team1Score - match.team2Score;
		match.team2!.round1Differential = match.team2Score - match.team1Score;
		if (this.scoreEnteredInAll(this.round1)) {
			// calculate next swiss round
			this.calculateRound2(this.round1);
			this.updateRound3(undefined);
		}
	}

	updateRound3(match: Match | undefined) {
		if (match !== undefined) {
			match.team1!.round2Differential =
				match.team1Score - match.team2Score;
			match.team2!.round2Differential =
				match.team2Score - match.team1Score;
		}
		if (
			this.scoreEnteredInAll(this.round2upper) &&
			this.scoreEnteredInAll(this.round2lower)
		) {
			this.calculateRound3();
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
		const winnersSorted = this.gameDiffSort(winners, 1);
		console.log(winnersSorted);
		this.createMatches(winnersSorted, this.round2upper);
		const losersSorted = this.gameDiffSort(losers, 1);
		console.log(losersSorted);
		this.createMatches(losersSorted, this.round2lower);
	}

	calculateRound3() {
		let upperWinners: Team[] = [];
		let upperLosers: Team[] = [];
		[upperWinners, upperLosers] = this.getWinnersAndLosers(
			this.round2upper
		);
		this.createMatches(
			this.gameDiffSort(upperWinners, 2),
			this.round3upper
		);

		let lowerWinners: Team[] = [];
		let lowerLosers: Team[] = [];
		[lowerWinners, lowerLosers] = this.getWinnersAndLosers(
			this.round2lower
		);
		this.createMatches(this.gameDiffSort(lowerLosers, 2), this.round3lower);

		const r1Andr2Matches = this.round1
			.concat(this.round2lower)
			.concat(this.round2upper);

		const upperLosersSorted = this.gameDiffSort(upperLosers, 2);
		const lowerWinnersSorted = this.gameDiffSort(lowerWinners, 2);
		let matchIndex = 0;

		while (upperLosersSorted.length > 0) {
			const currTeam = upperLosersSorted[0];
			const alreadyPlayed = this.getTeamsAlreadyPlayed(
				r1Andr2Matches,
				currTeam.name
			);
			let losersIndex = lowerWinnersSorted.length - 1;
			let potentialTeam = lowerWinnersSorted[losersIndex];
			while (true) {
				potentialTeam = lowerWinnersSorted[losersIndex];
				// if potential team not in alreadyPlayed, break
				if (
					this.checkIfPlayedAlready(alreadyPlayed, potentialTeam.name)
				) {
					losersIndex--;
				} else {
					break;
				}
			}

			this.round3middle[matchIndex].team1 = currTeam;
			this.round3middle[matchIndex].team2 = potentialTeam;

			upperLosersSorted.splice(0, 1);
			lowerWinnersSorted.splice(losersIndex, 1);
			matchIndex++;
		}

		console.log(upperLosersSorted);
		console.log(lowerWinnersSorted);
		// const middleTeams: Team[] = upperLosers.concat(lowerWinners);
		// this.createMatches(this.gameDiffSort(middleTeams), this.round3middle);
	}

	checkIfPlayedAlready(alreadyPlayed: Team[], teamName: string) {
		for (let team of alreadyPlayed) {
			if (team.name === teamName) {
				return true;
			}
		}
		return false;
	}

	getTeamsAlreadyPlayed(matches: Match[], teamName: String) {
		const matchingMatches = matches.filter(
			(a) => a.team1!.name === teamName || a.team2!.name === teamName
		);
		const res: Team[] = [];
		for (let match of matchingMatches) {
			if (match.team1!.name === teamName) {
				res.push(match.team2!);
			} else {
				res.push(match.team1!);
			}
		}
		return res;
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

	gameDiffSort(teams: Team[], option: number) {
		return teams.sort((a, b) => {
			let aDiff;
			let bDiff;
			switch (option) {
				case 1:
					aDiff = a.round1Differential;
					bDiff = b.round1Differential;
					break;
				case 2:
					aDiff = a.round1Differential + a.round2Differential;
					bDiff = b.round1Differential + b.round2Differential;
					break;
				case 3:
					aDiff =
						a.round1Differential +
						a.round2Differential +
						a.round3Differential;
					bDiff =
						b.round1Differential +
						b.round2Differential +
						b.round3Differential;
					break;
				case 4:
					aDiff =
						a.round1Differential +
						a.round2Differential +
						a.round3Differential +
						a.round4Differential;
					bDiff =
						b.round1Differential +
						b.round2Differential +
						b.round3Differential +
						b.round4Differential;
					break;
				default:
					aDiff = 0;
					bDiff = 0;
			}

			return bDiff - aDiff || a.initialSeed - b.initialSeed;
		});
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
