import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-match',
	standalone: true,
	imports: [],
	templateUrl: './match.component.html',
	styleUrl: './match.component.css',
})
export class MatchComponent {
	@Input() team1: string = '';
	@Input() team2: string = '';

	@Input() team1Score: number = 0;
	@Input() team2Score: number = 0;

	@Output() winnerEvent = new EventEmitter<string>();

	update(t1Score: string, t2Score: string) {
		this.team1Score = parseInt(t1Score);
		this.team2Score = parseInt(t2Score);
		console.log(`${this.team1Score} : ${this.team2Score}`);
		if (this.team1Score > this.team2Score) {
			console.log(`${this.team1} is winning`);
			this.winnerEvent.emit(this.team1);
		} else if (this.team1Score < this.team2Score) {
			console.log(`${this.team2} is winning`);
			this.winnerEvent.emit(this.team2);
		} else {
			console.log('The series is tied');
			this.winnerEvent.emit('');
		}
	}
}
