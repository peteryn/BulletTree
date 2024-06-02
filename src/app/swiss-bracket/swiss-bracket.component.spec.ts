import { ComponentFixture, TestBed } from '@angular/core/testing';
import { inject } from '@angular/core';

import { SwissBracketComponent } from './swiss-bracket.component';
import { TeamsService } from '../teams.service';

describe('SwissBracketComponent', () => {
	let component: SwissBracketComponent;
	let fixture: ComponentFixture<SwissBracketComponent>;
	let teamService: TeamsService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SwissBracketComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SwissBracketComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		teamService = new TeamsService();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('first team should exist in list', () => {
		const listOfTeams = teamService.get8Teams();
		const team = listOfTeams[0];
		const res = component.checkIfPlayedAlready(listOfTeams, team.name);
		expect(res).toBe(true);
	});

	it('last team should exist in list', () => {
		const listOfTeams = teamService.get8Teams();
		const team = listOfTeams[listOfTeams.length - 1];
		const res = component.checkIfPlayedAlready(listOfTeams, team.name);
		expect(res).toBe(true);
	});

	it('team not list should not be in list', () => {
		const listOfTeams = teamService.get8Teams();
		const team = listOfTeams.splice(4, 1)[0];
		const res = component.checkIfPlayedAlready(listOfTeams, team.name);
		expect(res).toBe(false);
	});
});
