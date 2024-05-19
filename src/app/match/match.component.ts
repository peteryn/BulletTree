import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from '../tree-node';

@Component({
	selector: 'app-match',
	standalone: true,
	imports: [],
	templateUrl: './match.component.html',
	styleUrl: './match.component.css',
})
export class MatchComponent {
	@Input() node!: TreeNode;

	@Output() winnerEvent = new EventEmitter<TreeNode>();

	update(t1Score: string, t2Score: string) {
		this.node.match.team1Score = parseInt(t1Score);
		this.node.match.team2Score = parseInt(t2Score);
		this.winnerEvent.emit(this.node);
		if (this.node.match.team1Score > this.node.match.team2Score) {
			console.log(`${this.node?.match.team1} is winning`);
		} else if (this.node.match.team1Score < this.node.match.team2Score) {
			console.log(`${this.node?.match.team2} is winning`);
		} else {
			console.log('The series is tied');
		}
	}
}
