import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatchComponent } from './match/match.component';
import { Match } from './match';
import { TreeNode } from './tree-node';
import { CommonModule } from '@angular/common';
import { SingleEliminationBracketComponent } from './single-elimination-bracket/single-elimination-bracket.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		NavbarComponent,
		MatchComponent,
		CommonModule,
		SingleEliminationBracketComponent,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'bulletTree';
}
