import { Component } from '@angular/core';
import { SwissRoundComponent } from '../swiss-round/swiss-round.component';

@Component({
	selector: 'app-swiss-bracket',
	standalone: true,
	imports: [SwissRoundComponent],
	templateUrl: './swiss-bracket.component.html',
	styleUrl: './swiss-bracket.component.css',
})
export class SwissBracketComponent {}
