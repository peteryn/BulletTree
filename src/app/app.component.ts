import { Component, ViewChild, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MatchComponent } from './match/match.component';
import { CommonModule } from '@angular/common';
import { SwissBracketComponent } from './swiss-bracket/swiss-bracket.component';
import { SingleEliminationBracketComponent } from './single-elimination-bracket/single-elimination-bracket.component';
import { Screenshot } from './screenshot/screenshot.component';
import { Team } from './team';
import { TeamsService } from './teams.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [
		RouterOutlet,
		NavbarComponent,
		MatchComponent,
		CommonModule,
		SwissBracketComponent,
		SingleEliminationBracketComponent,
		Screenshot,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'bulletTree';
	teamService = inject(TeamsService);

	@ViewChild(SingleEliminationBracketComponent) child:
		| SingleEliminationBracketComponent
		| undefined;
	update(teams: (Team | undefined)[]) {
		this.child?.createMatches(teams);
	}
}
