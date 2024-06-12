import { Routes } from '@angular/router';
import { SwissBracketComponent } from './swiss-bracket/swiss-bracket.component';
import { SingleEliminationBracketComponent } from './single-elimination-bracket/single-elimination-bracket.component';
import { AppComponent } from './app.component';
import { BracketContainerComponent } from './bracket-container/bracket-container.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
	// { path: 'swiss', component: SwissBracketComponent },
	// { path: 'single-elim', component: SingleEliminationBracketComponent },
	{ path: ':name', component: BracketContainerComponent, title: 'bulletTree' },
	// { path: '', component: HomeComponent, title: 'bulletTree' },
	{ path: '', redirectTo: '/major2', pathMatch: 'full' },
];
