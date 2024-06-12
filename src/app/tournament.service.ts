import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TournamentService {
	codeToName = new Map();
	constructor() {
		this.codeToName.set('na4', 'RLCS 2024 - Major 2: North America Open Qualifier 4');
		this.codeToName.set('na5', 'RLCS 2024 - Major 2: North America Open Qualifier 5');
		this.codeToName.set('na6', 'RLCS 2024 - Major 2: North America Open Qualifier 6');
		this.codeToName.set('major2', 'Rocket League Championship Series 2024 - Major 2: London');
	}

	getTournamentName(code: string) {
		return this.codeToName.get(code);
	}
}
