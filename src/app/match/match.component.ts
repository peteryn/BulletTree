import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TreeNode } from '../tree-node';
import { Match } from '../match';

@Component({
	selector: 'app-match',
	standalone: true,
	imports: [],
	templateUrl: './match.component.html',
	styleUrl: './match.component.css',
})
export class MatchComponent {
	// @Input() node!: TreeNode;
	@Input() match!: Match;

	@Output() winnerEvent = new EventEmitter<Match>();

	update(t1Score: string, t2Score: string) {
		this.match.team1Score = parseInt(t1Score);
		this.match.team2Score = parseInt(t2Score);
		this.winnerEvent.emit(this.match);
	}
}
