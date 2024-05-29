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
	round1: Match[] = [];
	round2upper: Match[] = [];
	round2lower: Match[] = [];
	round3upper: Match[] = [];
	round3middle: Match[] = [];
	round3lower: Match[] = [];
	round4upper: Match[] = [];
	round4lower: Match[] = [];
	round5: Match[] = [];
	qualified: Team[] = [];
	eliminated: Team[] = [];

	constructor() {
		for (let i = 0; i < 8; i++) {
			this.round1.push(this.createEmptyMatch());
		}

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
		this.createMatches(this.teams, this.round1);
		this.updateRound2(undefined);
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

	updateRound2(match: Match | undefined) {
		if (match !== undefined) {
			match.team1!.round1Differential =
				match.team1Score - match.team2Score;
			match.team2!.round1Differential =
				match.team2Score - match.team1Score;
		}
		if (this.scoreEnteredInAll(this.round1)) {
			// calculate next swiss round
			this.calculateRound2(this.round1);
			this.updateRound3(undefined);
		} else {
			// TODO: clear all later stage matches
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
		} else {
		}
	}

	updateRound4(match: Match | undefined) {
		if (match !== undefined) {
			match.team1!.round3Differential =
				match.team1Score - match.team2Score;
			match.team2!.round3Differential =
				match.team2Score - match.team1Score;
		}
		if (
			this.scoreEnteredInAll(this.round3lower) &&
			this.scoreEnteredInAll(this.round3middle) &&
			this.scoreEnteredInAll(this.round3lower)
		) {
			this.calculateRound4();
		}
	}

	updateRound5(match: Match | undefined) {
		if (match !== undefined) {
			match.team1!.round4Differential =
				match.team1Score - match.team2Score;
			match.team2!.round4Differential =
				match.team2Score - match.team1Score;
		}
		if (
			this.scoreEnteredInAll(this.round4upper) &&
			this.scoreEnteredInAll(this.round4lower)
		) {
			this.calculateRound5();
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
		console.log('winners sorted');
		console.log(winnersSorted);
		this.createMatches(winnersSorted, this.round2upper);
		const losersSorted = this.gameDiffSort(losers, 1);
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
		this.createComplexMatchs(
			r1Andr2Matches,
			upperLosersSorted,
			lowerWinnersSorted,
			this.round3middle
		);
	}

	calculateRound4() {
		let upperWinner: Team[];
		let upperLoser: Team[];
		[upperWinner, upperLoser] = this.getWinnersAndLosers(this.round3upper);
		this.qualified.concat(this.gameDiffSort(upperWinner, 3));
		upperLoser = this.gameDiffSort(upperLoser, 3);

		let middleWinner: Team[];
		let middleLoser: Team[];
		[middleWinner, middleLoser] = this.getWinnersAndLosers(
			this.round3middle
		);
		middleWinner = this.gameDiffSort(middleWinner, 3);
		middleLoser = this.gameDiffSort(middleLoser, 3);

		let lowerWinner: Team[];
		let lowerLoser: Team[];
		[lowerWinner, lowerLoser] = this.getWinnersAndLosers(this.round3lower);
		lowerWinner = this.gameDiffSort(lowerWinner, 3);
		this.eliminated.concat(this.gameDiffSort(lowerLoser, 3));

		const r1r2r3matches = this.round1
			.concat(this.round2lower)
			.concat(this.round2upper)
			.concat(this.round3lower)
			.concat(this.round3middle)
			.concat(this.round3upper);

		// handle r4 upper
		const leftOvers = this.createComplexMatchs(
			r1r2r3matches,
			upperLoser,
			middleWinner,
			this.round4upper
		);
		this.round4upper[this.round4upper.length - 1].team1 = leftOvers[0];
		this.round4upper[this.round4upper.length - 1].team2 = leftOvers[1];

		// handle r4 lower
		const lowerLeftovers = middleLoser.splice(2, 2);
		this.createComplexMatchs(
			r1r2r3matches,
			middleLoser,
			lowerWinner,
			this.round4lower
		);
		this.round4lower[this.round4lower.length - 1].team1 = lowerLeftovers[0];
		this.round4lower[this.round4lower.length - 1].team2 = lowerLeftovers[1];
	}

	calculateRound5() {
		let upperWinner: Team[];
		let upperLoser: Team[];
		[upperWinner, upperLoser] = this.getWinnersAndLosers(this.round4upper);
		this.qualified.concat(this.gameDiffSort(upperWinner, 4));
		upperLoser = this.gameDiffSort(upperLoser, 4);

		let lowerWinner: Team[];
		let lowerLoser: Team[];
		[lowerWinner, lowerLoser] = this.getWinnersAndLosers(this.round4lower);
		lowerWinner = this.gameDiffSort(lowerWinner, 4);
		this.eliminated.concat(this.gameDiffSort(lowerLoser, 4));

		const r1r2r3r4matches = this.round1
			.concat(this.round2lower)
			.concat(this.round2upper)
			.concat(this.round3lower)
			.concat(this.round3middle)
			.concat(this.round4upper)
			.concat(this.round4lower);

		const remainingTeams = upperLoser.concat(lowerWinner);
		let l = 0;
		let r = remainingTeams.length - 1;
		let matchIndex = 0;
		while (remainingTeams.length > 0) {
			const topTeam = remainingTeams[l];
			console.log(topTeam);
			const alreadyPlayed = this.getTeamsAlreadyPlayed(
				r1r2r3r4matches,
				topTeam.name
			);
			console.log(alreadyPlayed);
			let botTeam = remainingTeams[r];
			while (true) {
				botTeam = remainingTeams[r];
				if (this.checkIfPlayedAlready(alreadyPlayed, botTeam.name)) {
					r--;
				} else {
					break;
				}
			}
			console.log(botTeam);
			this.round5[matchIndex].team1 = topTeam;
			this.round5[matchIndex].team2 = botTeam;

			remainingTeams.splice(r, 1);
			remainingTeams.splice(l, 1);
			matchIndex++;
			r = remainingTeams.length - 1;
		}
	}

	createComplexMatchs(
		allMatches: Match[],
		upper: Team[],
		lower: Team[],
		round: Match[]
	) {
		let matchIndex = 0;
		while (upper.length > 0) {
			const currTeam = upper[0];
			const alreadyPlayed = this.getTeamsAlreadyPlayed(
				allMatches,
				currTeam.name
			);
			let losersIndex = lower.length - 1;
			let potentialTeam = lower[losersIndex];
			while (true) {
				potentialTeam = lower[losersIndex];
				if (
					this.checkIfPlayedAlready(alreadyPlayed, potentialTeam.name)
				) {
					losersIndex--;
				} else {
					break;
				}
			}

			round[matchIndex].team1 = currTeam;
			round[matchIndex].team2 = potentialTeam;

			upper.splice(0, 1);
			lower.splice(losersIndex, 1);
			matchIndex++;
		}

		return lower;
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
			matches[i].team1Score = this.gameDiffToScore(
				teams[l].round1Differential
			);
			matches[i].team2Score = this.gameDiffToScore(
				teams[r].round1Differential
			);
			l++;
			r--;
			i++;
		}
	}

	// game diff to match score for bo5
	// 3 -> 3
	// 2 -> 3
	// 1 -> 3
	// -1 -> 2
	// -2 -> 1
	// -3 -> 0
	gameDiffToScore(gameDiff: number) {
		let res = 0;
		switch (gameDiff) {
			case 3:
			case 2:
			case 1:
				res = 3;
				break;
			case -1:
				res = 2;
				break;
			case -2:
				res = 1;
				break;
			case -3:
				res = 0;
				break;
			default:
				res = 0;
		}
		return res;
	}
}
