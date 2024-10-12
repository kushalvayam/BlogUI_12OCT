import { Component, OnInit, Inject, HostListener } from '@angular/core';

declare var $: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	status: string = 'Loading..';
	ua: string = window.navigator.userAgent;

	switchAdminToLearnerUrl: string|any;

	@HostListener('window:beforeunload', ['$event']) beforeunloadHandler(event:any) {
		
	}

	constructor(){	}

	ngOnInit(): void {
	
	}
	
}
