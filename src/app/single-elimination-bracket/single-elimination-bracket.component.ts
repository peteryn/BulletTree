import { Component, inject } from '@angular/core';
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
	teams = this.teamsService.get8Teams();

	matchIdToNode = new Map<number, TreeNode>();

	constructor() {
		const grandFinal = this.createPlayoffBracket(this.teams);
	}

	// TODO remove and use the one inside teams service
	createMatches(teams: Team[], matches: Match[]) {
		for (let i = 0; i < teams.length; i += 2) {
			matches.push({
				team1: teams[i],
				team2: teams[i + 1],
				team1Score: 0,
				team2Score: 0,
				matchId: Math.floor(Math.random() * 100000), // TODO, figure out a better way to create ids
			});
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
			this.updateParent(node!, {
				name: '',
				initialSeed: -1,
				logo: '',
				gameDifferential: 0,
			});
		}
	}

	updateParent(node: TreeNode, team: Team | undefined) {
		if (node.onParentLeft) {
			node.parent!.match.team1 = team;
		} else {
			node.parent!.match.team2 = team;
		}
	}

	createPlayoffBracket(teams: Team[]): TreeNode {
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
		this.createMatches(teams, matches);
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
