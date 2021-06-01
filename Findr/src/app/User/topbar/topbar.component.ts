import {Component, OnInit} from '@angular/core';
import {AuthService} from '../login/auth.service';
import {TopbarService} from './topbar.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

    constructor(private authService: AuthService, private topBarService: TopbarService) {
    }

    ngOnInit(): void {
    }

    logout(): void {
        this.authService.logout();
    }

    altCollapse(): void {
        this.topBarService.collapseNavbar = !this.topBarService.collapseNavbar;
    }
}
