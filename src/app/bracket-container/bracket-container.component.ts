import { Component, ViewChild, inject } from '@angular/core';
import { TeamsService } from '../teams.service';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SingleEliminationBracketComponent } from '../single-elimination-bracket/single-elimination-bracket.component';
import { Screenshot } from '../screenshot/screenshot.component';
import { SwissBracketComponent } from '../swiss-bracket/swiss-bracket.component';
import { Team } from '../team';

@Component({
	selector: 'app-bracket-container',
	standalone: true,
	imports: [
		RouterOutlet,
		CommonModule,
		SingleEliminationBracketComponent,
		SwissBracketComponent,
		Screenshot,
	],
	templateUrl: './bracket-container.component.html',
	styleUrl: './bracket-container.component.css',
})
export class BracketContainerComponent {
	teamService = inject(TeamsService);
	teams = this.teamService.getAllTeams();

	constructor(private route: ActivatedRoute) {
		const p = this.route.snapshot.paramMap.get('name');
		this.teams = this.teamService.getTeamsByTournament(p!);
	}

	@ViewChild(SingleEliminationBracketComponent) child:
		| SingleEliminationBracketComponent
		| undefined;
	update(teams: (Team | undefined)[]) {
		this.child?.createMatches(teams);
	}
}
