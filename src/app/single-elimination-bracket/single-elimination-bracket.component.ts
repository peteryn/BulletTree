import { Component } from '@angular/core';
import { Match } from '../match';
import { MatchComponent } from '../match/match.component';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../tree-node';

@Component({
	selector: 'app-single-elimination-bracket',
	standalone: true,
	imports: [MatchComponent, CommonModule],
	templateUrl: './single-elimination-bracket.component.html',
	styleUrl: './single-elimination-bracket.component.css',
})
export class SingleEliminationBracketComponent {
	quarterFinals: Match[] = [];
	semiFinals: Match[] = [];
	grandFinals: Match[] = [];
	semiFinalTeams: string[] = [];
	grandFinalTeams: string[] = [];

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

	createPlayoffBracket(teamsBySeed: string[]): TreeNode {
		const grandFinal: TreeNode = {
			left: undefined,
			right: undefined,
			parent: undefined,
			onParentLeft: undefined,
			match: this.createEmptyMatch(),
		};

		this.dfs(grandFinal, 0, 2);
		return grandFinal;
	}

	createTreeNode(parent: TreeNode, onParentLeft: boolean): TreeNode {
		const node: TreeNode = {
			left: undefined,
			right: undefined,
			parent: parent,
			onParentLeft: onParentLeft,
			match: this.createEmptyMatch(),
		};
		return node;
	}

	createEmptyMatch(): Match {
		return {
			team1: '',
			team2: '',
			team1Score: 0,
			team2Score: 0,
		};
	}

	dfs(curr: TreeNode, currDepth: number, maxDepth: number) {
		if (currDepth === maxDepth) {
			return;
		}

		let newDepth = currDepth + 1;
		if (curr.left === undefined) {
			curr.left = this.createTreeNode(curr, true);
			this.dfs(curr.left, newDepth, maxDepth);
		}
		if (curr.right === undefined) {
			curr.right = this.createTreeNode(curr, false);
			this.dfs(curr.left, newDepth, maxDepth);
		}
	}
}
