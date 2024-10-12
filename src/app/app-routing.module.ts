import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},	
	{
		path: 'login',
		component: BlogComponent,
		pathMatch: 'full'
	},
	
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes,{
			useHash: true,
			initialNavigation: 'enabledNonBlocking',
			enableTracing: false
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
