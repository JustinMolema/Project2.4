import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-admintopbar',
    templateUrl: './admintopbar.component.html',
    styleUrls: ['./admintopbar.component.css']
})
export class AdmintopbarComponent implements OnInit {
    @Input() title;

    constructor() {
    }

    ngOnInit(): void {
    }
}
