import { Component, inject, Input } from '@angular/core';
import { Match } from '../match';
import { MatchComponent } from '../match/match.component';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../tree-node';
import { TeamsService } from '../teams.service';
import { Team } from '../team';

@Component({
	selector: 'app-single-elimination-bracket',
	standalone: true,
	imports: [MatchComponent, CommonModule],
	templateUrl: './single-elimination-bracket.component.html',
	styleUrl: './single-elimination-bracket.component.css',
})
export class SingleEliminationBracketComponent {
	quarterFinals: TreeNode[] = [];
	semiFinals: TreeNode[] = [];
	grandFinals: TreeNode[] = [];

	semiFinalTeams: string[] = [];
	grandFinalTeams: string[] = [];

	teamsService = inject(TeamsService);
	teams: (Team | undefined)[] = [];

	matchIdToNode = new Map<number, TreeNode>();
	grandFinal: TreeNode | undefined = undefined;

	constructor() {
		this.grandFinal = this.createPlayoffBracket(this.teams);
	}

	// TODO remove and use the one inside teams service
	createMatches(teams: (Team | undefined)[]) {
		let l = 0;
		let r = teams.length - 1;
		let i = 0;
		let tempMatches: Match[] = [];
		while (l < r) {
			tempMatches.push({
				team1: teams[l],
				team2: teams[r],
				team1Score: 0,
				team2Score: 0,
				matchId: Math.floor(Math.random() * 100000), // TODO, figure out a better way to create ids
			});
			l++;
			r--;
			i++;
		}

		let temp = tempMatches.splice(1, 3);
		let temp2 = temp.splice(2, 1);
		tempMatches = tempMatches.concat(temp2, temp);
		for (let i = 0; i < this.quarterFinals.length; i++) {
			this.quarterFinals[i].match.team1 = tempMatches[i].team1;
			this.quarterFinals[i].match.team2 = tempMatches[i].team2;
		}
	}

	// TODO: bug, users inputting scoreline before there is a team causes team to be declared winner without updating bracket
	// disable form input when there is no team
	update(match: Match) {
		const node = this.matchIdToNode.get(match.matchId); // need a way to go from match -> node
		if (match.team1Score > match.team2Score) {
			this.updateParent(node!, match.team1);
		} else if (match.team1Score < match.team2Score) {
			this.updateParent(node!, match.team2);
		} else {
			this.updateParent(node!, undefined);
		}
	}

	updateParent(node: TreeNode, team: Team | undefined) {
		// console.log('node');
		// console.log(node);
		if (node.onParentLeft) {
			// console.log('updated parent team1');
			// console.log(node.parent);
			node.parent!.match.team1 = team;
		} else {
			// console.log('updated parent team2');
			// console.log(node.parent);
			node.parent!.match.team2 = team;
		}
	}

	createPlayoffBracket(teams: (Team | undefined)[]): TreeNode {
		const grandFinal: TreeNode = {
			left: undefined,
			right: undefined,
			parent: undefined,
			onParentLeft: undefined,
			match: this.createEmptyMatch(),
		};

		this.dfs(grandFinal, 0, 2, [this.grandFinals, this.semiFinals, this.quarterFinals]);

		const matches: Match[] = [];
		for (let i = 0; i < matches.length; i++) {
			this.quarterFinals[i].match = matches[i];
			this.matchIdToNode.set(matches[i].matchId, this.quarterFinals[i]);
		}
		this.matchIdToNode.set(grandFinal.match.matchId, grandFinal);

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
		this.matchIdToNode.set(node.match.matchId, node);
		return node;
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

	dfs(curr: TreeNode, currDepth: number, maxDepth: number, layers: TreeNode[][]) {
		layers[currDepth].push(curr);
		if (currDepth === maxDepth) {
			return;
		}

		let newDepth = currDepth + 1;
		if (curr.left === undefined) {
			curr.left = this.createTreeNode(curr, true);
			this.dfs(curr.left, newDepth, maxDepth, layers);
		}
		if (curr.right === undefined) {
			curr.right = this.createTreeNode(curr, false);
			this.dfs(curr.right, newDepth, maxDepth, layers);
		}
	}
}
