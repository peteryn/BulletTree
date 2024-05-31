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
	// teams = this.teamsService.get8Teams();
	@Input() teams: (Team | undefined)[] = [];

	matchIdToNode = new Map<number, TreeNode>();

	constructor() {
		console.log('why');
		console.log(this.teams);
		const grandFinal = this.createPlayoffBracket(this.teams);
	}

	// TODO remove and use the one inside teams service
	createMatches(teams: (Team | undefined)[]) {
		// for (let i = 0; i < teams.length; i += 2) {
		// 	matches.push({
		// 		team1: teams[i],
		// 		team2: teams[i + 1],
		// 		team1Score: 0,
		// 		team2Score: 0,
		// 		matchId: Math.floor(Math.random() * 100000), // TODO, figure out a better way to create ids
		// 	});
		// }
		let l = 0;
		let r = teams.length - 1;
		let i = 0;
		const tempMatches: Match[] = [];
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

		tempMatches[0].matchId = this.quarterFinals[0].match.matchId;
		tempMatches[1].matchId = this.quarterFinals[3].match.matchId;
		tempMatches[2].matchId = this.quarterFinals[2].match.matchId;
		tempMatches[3].matchId = this.quarterFinals[1].match.matchId;
		this.quarterFinals[0].match = tempMatches[0];
		this.quarterFinals[1].match = tempMatches[3];
		this.quarterFinals[2].match = tempMatches[1];
		this.quarterFinals[3].match = tempMatches[2];
		// matches.push(tempMatches[0]);
		// matches.push(tempMatches[3]);
		// matches.push(tempMatches[1]);
		// matches.push(tempMatches[2]);
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
		if (node.onParentLeft) {
			node.parent!.match.team1 = team;
		} else {
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

		this.dfs(grandFinal, 0, 2, [
			this.grandFinals,
			this.semiFinals,
			this.quarterFinals,
		]);

		const matches: Match[] = [];
		// this.createMatches(teams, matches);
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

	dfs(
		curr: TreeNode,
		currDepth: number,
		maxDepth: number,
		layers: TreeNode[][]
	) {
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
