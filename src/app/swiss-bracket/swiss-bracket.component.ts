import {
	Component,
	inject,
	ViewChild,
	ElementRef,
	viewChild,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { Team } from '../team';
import { Match } from '../match';
import { TeamsService } from '../teams.service';
import { MatchComponent } from '../match/match.component';
import { Screenshot } from '../screenshot/screenshot.component';
import { SingleEliminationBracketComponent } from '../single-elimination-bracket/single-elimination-bracket.component';

@Component({
	selector: 'app-swiss-bracket',
	standalone: true,
	imports: [MatchComponent, Screenshot, SingleEliminationBracketComponent],
	templateUrl: './swiss-bracket.component.html',
	styleUrl: './swiss-bracket.component.css',
})
export class SwissBracketComponent {
	teamsService = inject(TeamsService);
	// teams = this.teamsService.getAllTeams();
	@Input() teams: Team[] = [];
	round1: Match[] = [];
	round2upper: Match[] = [];
	round2lower: Match[] = [];
	round3upper: Match[] = [];
	round3middle: Match[] = [];
	round3lower: Match[] = [];
	round4upper: Match[] = [];
	round4lower: Match[] = [];
	round5: Match[] = [];
	qualified: (Team | undefined)[] = [];
	eliminated: Team[] = [];
	@Output() top8event = new EventEmitter<(Team | undefined)[]>();

	ngOnChanges() {
		this.createMatches(this.teams, this.round1);
	}

	constructor() {
		for (let i = 0; i < 8; i++) {
			this.round1.push(this.createEmptyMatch());
			this.qualified.push(undefined);
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
		this.updateRound2(undefined);
		this.updateRound3(undefined);
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
		// empty stub
	}

	updateRound2(match: Match | undefined) {
		if (match !== undefined) {
			match.team1!.round1Differential = match.team1Score - match.team2Score;
			match.team2!.round1Differential = match.team2Score - match.team1Score;
		}
		if (this.scoreEnteredInAll(this.round1)) {
			// calculate next swiss round
			this.calculateRound2(this.round1);
			this.updateRound3(undefined);
		} else {
			// TODO: clear all later stage matches
			if (this.round2upper[0].team1 !== undefined) {
				this.clearRound('round2Differential', this.round2lower, this.round2upper);
			}
			if (this.round3upper[0].team1 !== undefined) {
				this.clearRound(
					'round3Differential',
					this.round3upper,
					this.round3middle,
					this.round3lower
				);
			}
			if (this.round4upper[0].team1 !== undefined) {
				this.clearRound('round4Differential', this.round4upper, this.round4lower);
			}
			if (this.round5[0].team1 !== undefined) {
				this.clearRound('round5Differential', this.round5);
			}
			this.qualified = this.qualified.map(() => undefined);
			this.top8event.emit(this.qualified);
		}
	}

	clearRound<T extends keyof Team>(differentialToClear: T, ...rounds: Match[][]) {
		for (let round of rounds) {
			for (let match of round) {
				if (match.team1 === undefined || match.team2 === undefined) {
					continue;
				}
				match.team1[differentialToClear] = 0 as any;
				match.team2[differentialToClear] = 0 as any;
				match.team1 = undefined;
				match.team2 = undefined;
				match.team1Score = 0;
				match.team2Score = 0;
			}
		}
	}

	updateRound3(match: Match | undefined) {
		if (match !== undefined) {
			match.team1!.round2Differential = match.team1Score - match.team2Score;
			match.team2!.round2Differential = match.team2Score - match.team1Score;
		}
		if (this.scoreEnteredInAll(this.round2upper) && this.scoreEnteredInAll(this.round2lower)) {
			this.calculateRound3();
		} else {
		}
	}

	updateRound4(match: Match | undefined) {
		if (match !== undefined) {
			match.team1!.round3Differential = match.team1Score - match.team2Score;
			match.team2!.round3Differential = match.team2Score - match.team1Score;
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
			match.team1!.round4Differential = match.team1Score - match.team2Score;
			match.team2!.round4Differential = match.team2Score - match.team1Score;
		}
		if (this.scoreEnteredInAll(this.round4upper) && this.scoreEnteredInAll(this.round4lower)) {
			this.calculateRound5();
		}
	}

	collectFromRound5(match: Match) {
		let winners: Team[] = [];
		let losers: Team[] = [];
		match.team1!.round5Differential = match.team1Score - match.team2Score;
		match.team2!.round5Differential = match.team2Score - match.team1Score;
		if (this.scoreEnteredInAll(this.round5)) {
			[winners, losers] = this.getWinnersAndLosers(this.round5);
			winners = this.gameDiffSort(winners, 5);
			this.qualified[5] = winners[0];
			this.qualified[6] = winners[1];
			this.qualified[7] = winners[2];
			this.top8event.emit(this.qualified);
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
		this.createMatches(winnersSorted, this.round2upper);
		const losersSorted = this.gameDiffSort(losers, 1);
		this.createMatches(losersSorted, this.round2lower);
	}

	calculateRound3() {
		let upperWinners: Team[] = [];
		let upperLosers: Team[] = [];
		[upperWinners, upperLosers] = this.getWinnersAndLosers(this.round2upper);
		this.createMatches(this.gameDiffSort(upperWinners, 2), this.round3upper);

		let lowerWinners: Team[] = [];
		let lowerLosers: Team[] = [];
		[lowerWinners, lowerLosers] = this.getWinnersAndLosers(this.round2lower);
		this.createMatches(this.gameDiffSort(lowerLosers, 2), this.round3lower);

		const r1Andr2Matches = this.round1.concat(this.round2lower).concat(this.round2upper);

		const upperLosersSorted = this.gameDiffSort(upperLosers, 2);
		const lowerWinnersSorted = this.gameDiffSort(lowerWinners, 2);
		this.createComplexMatches(
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
		upperWinner = this.gameDiffSort(upperWinner, 3);
		this.qualified[0] = upperWinner[0];
		this.qualified[1] = upperWinner[1];
		upperLoser = this.gameDiffSort(upperLoser, 3);

		let middleWinner: Team[];
		let middleLoser: Team[];
		[middleWinner, middleLoser] = this.getWinnersAndLosers(this.round3middle);
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

		upperLoser.push(middleWinner.splice(0, 1)[0]);
		this.cartesianProductMatches(r1r2r3matches, upperLoser, middleWinner, this.round4upper);

		lowerWinner = middleLoser.splice(middleLoser.length - 1, 1).concat(lowerWinner);
		this.cartesianProductMatches(r1r2r3matches, middleLoser, lowerWinner, this.round4lower);
	}

	cartesianProductMatches(allMatches: Match[], upper: Team[], lower: Team[], round: Match[]) {
		const cartesianProduct = (a: Team[], b: Team[]) => a.flatMap((x) => b.map((y) => [x, y]));
		const upperLowerCross = cartesianProduct(upper, lower.reverse());
		let upperLowerCrossCopy = JSON.parse(JSON.stringify(upperLowerCross));
		for (let i = 0; i < upperLowerCrossCopy.length; i++) {
			const t1 = upperLowerCrossCopy[i][0];
			const t2 = upperLowerCrossCopy[i][1];
			const alreadyPlayed = this.getTeamsAlreadyPlayed(allMatches, t1.name);
			if (this.checkIfPlayedAlready(alreadyPlayed, t2.name)) {
				upperLowerCrossCopy[i] = null;
			}
		}
		upperLowerCrossCopy = upperLowerCrossCopy.filter((item: Team[]) => item);
		let teamCrossClean = JSON.parse(JSON.stringify(upperLowerCrossCopy));
		console.log(teamCrossClean);
		const stack: any[] = [];
		let invalidIndexes: number[] = [];
		let index = 0;
		while (stack.length < 3) {
			if (index >= teamCrossClean.length) {
				let badMatch = stack.pop();
				invalidIndexes = badMatch.invalidIndexes;
				invalidIndexes.push(badMatch.index);
				index = 0;
			}

			if (invalidIndexes.indexOf(index) != -1) {
				index++;
				continue;
			}
			const invalidIndexesCopy = structuredClone(invalidIndexes);
			const match = teamCrossClean[index];
			const team1 = match[0];
			const team2 = match[1];
			for (let i = 0; i < teamCrossClean.length; i++) {
				if (
					teamCrossClean[i][0].name === team1.name ||
					teamCrossClean[i][0].name === team2.name ||
					teamCrossClean[i][1].name === team1.name ||
					teamCrossClean[i][1].name === team2.name
				) {
					invalidIndexes.push(i);
				}
			}

			stack.push({
				match: match,
				invalidIndexes: invalidIndexesCopy,
				index: index,
			});
		}
		for (let i = 0; i < round.length; i++) {
			const t1 = stack[i].match[0];
			const t2 = stack[i].match[1];
			round[i].team1 = t1;
			round[i].team2 = t2;
		}
	}

	calculateRound5() {
		let upperWinner: Team[];
		let upperLoser: Team[];
		[upperWinner, upperLoser] = this.getWinnersAndLosers(this.round4upper);
		this.qualified.concat(this.gameDiffSort(upperWinner, 4));
		upperWinner = this.gameDiffSort(upperWinner, 4);
		this.qualified[2] = upperWinner[0];
		this.qualified[3] = upperWinner[1];
		this.qualified[4] = upperWinner[2];
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

		this.cartesianProductMatches(r1r2r3r4matches, upperLoser, lowerWinner, this.round5);
	}

	createComplexMatches(
		allMatches: Match[],
		upper: Team[],
		lower: (Team | undefined)[],
		round: Match[]
	) {
		upper.reverse();
		const map = [3, 2, 1, 0];
		for (let i = 0; i < upper.length; i++) {
			const top = upper[i];
			const topMatchHistory = this.getTeamsAlreadyPlayed(allMatches, top.name);
			for (let j = 0; j < lower.length; j++) {
				const bot = lower[j];
				if (bot === undefined) {
					continue;
				}
				if (this.checkIfPlayedAlready(topMatchHistory, bot.name)) {
					continue;
				} else {
					round[map[i]].team1 = top;
					round[map[i]].team2 = bot;
					lower[j] = undefined;
					break;
				}
			}
		}
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
					aDiff = a.round1Differential + a.round2Differential + a.round3Differential;
					bDiff = b.round1Differential + b.round2Differential + b.round3Differential;
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
				case 5:
					aDiff =
						a.round1Differential +
						a.round2Differential +
						a.round3Differential +
						a.round4Differential +
						a.round5Differential;
					bDiff =
						b.round1Differential +
						b.round2Differential +
						b.round3Differential +
						b.round4Differential +
						b.round5Differential;
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
