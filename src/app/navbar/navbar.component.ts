import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SingleEliminationBracketComponent } from '../single-elimination-bracket/single-elimination-bracket.component';
import { SwissBracketComponent } from '../swiss-bracket/swiss-bracket.component';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [
		RouterLink,
		RouterOutlet,
		SingleEliminationBracketComponent,
		SwissBracketComponent,
	],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {}
