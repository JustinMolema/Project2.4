import {ApplicationRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./User/login/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Findr';

    stable;
    interval;

    constructor(public router: Router, private authService: AuthService, private app: ApplicationRef) {
    }

    ngOnInit(): void {
        this.stable = this.app.isStable.subscribe((isStable) => {
            if (isStable) {
                this.setRefreshInterval();
                this.stable.unsubscribe();
            }
        });
    }

    setRefreshInterval(): void {
        setInterval(() => {
            this.refreshToken();
            // if (this.authService.refreshTokenInterval) {
            //
            // }
        }, 1000);
    }

    refreshToken(): void {
        this.authService.refreshToken().subscribe(res => {
            if (res != null) {
                if (this.authService.localstorage) {
                    localStorage.setItem('jwt', res.accessToken);
                } else {
                    sessionStorage.setItem('jwt', res.accessToken);
                }
            }
        });
    }
}
