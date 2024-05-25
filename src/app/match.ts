import { Team } from './team';

export interface Match {
	team1: Team | undefined;
	team2: Team | undefined;
	team1Score: number;
	team2Score: number;
	matchId: number;
}
