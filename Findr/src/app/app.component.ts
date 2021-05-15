import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Findr';

    showHeader = false;

    constructor(public router: Router) {

    }

    ngOnInit(){

    }

    //TODO: conformation for warning, ban,  dismiss (user reported)
    //TODO: Add new game
    //TODO: SupportTickter view
    //TODO: Styling button (icons add)
}
