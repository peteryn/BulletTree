import { Component, Input } from '@angular/core';

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

	team1Score: number = 0;
	team2Score: number = 0;

	update(t1Score: string, t2Score: string) {
		this.team1Score = parseInt(t1Score);
		this.team2Score = parseInt(t2Score);
		console.log(`${this.team1Score} : ${this.team2Score}`);
		if (this.team1Score > this.team2Score) {
			console.log(`${this.team1} is winning`);
		} else if (this.team1Score < this.team2Score) {
			console.log(`${this.team2} is winning`);
		} else {
			console.log('The series is tied');
		}
	}
}
