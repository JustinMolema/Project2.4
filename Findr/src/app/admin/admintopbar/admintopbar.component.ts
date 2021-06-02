import {Component, Input, OnInit} from '@angular/core';
import {AdminBarService} from "../admin-bar/admin-bar.service";

@Component({
    selector: 'app-admintopbar',
    templateUrl: './admintopbar.component.html',
    styleUrls: ['./admintopbar.component.css']
})
export class AdmintopbarComponent implements OnInit {
    @Input() title;

    constructor(public adminbarService: AdminBarService) {
    }

    ngOnInit(): void {
    }
}
