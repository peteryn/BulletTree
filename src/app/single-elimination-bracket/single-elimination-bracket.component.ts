import { Component, inject } from '@angular/core';
import { Match } from '../match';
import { MatchComponent } from '../match/match.component';
import { CommonModule } from '@angular/common';
import { TreeNode } from '../tree-node';
import { TeamsService } from '../teams.service';

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

	constructor() {
		const grandFinal = this.createPlayoffBracket(this.teams);
	}

	// TODO remove and use the one inside teams service
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

	update(node: TreeNode) {
		if (node.match.team1Score > node.match.team2Score) {
			this.updateParent(node, node.match.team1);
		} else if (node.match.team1Score < node.match.team2Score) {
			this.updateParent(node, node.match.team2);
		} else {
			this.updateParent(node, '');
		}
	}

	updateParent(node: TreeNode, team: string) {
		if (node.onParentLeft) {
			node.parent!.match.team1 = team;
		} else {
			node.parent!.match.team2 = team;
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

		this.dfs(grandFinal, 0, 2, [
			this.grandFinals,
			this.semiFinals,
			this.quarterFinals,
		]);

		const matches: Match[] = [];
		this.createMatches(this.teams, matches);
		for (let i = 0; i < matches.length; i++) {
			this.quarterFinals[i].match = matches[i];
		}

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
