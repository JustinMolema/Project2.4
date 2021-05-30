import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdmindataService } from './admin/admindata.service';
import { AuthService } from './User/login/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Findr';

    showHeader = false;

    constructor(public router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.setRefreshInterval();
    }

    setRefreshInterval(): void {
        setInterval(() => {
            this.refreshToken();

            if (this.authService.refreshTokenInterval) {
                console.log("sdfdsafdsf");

            }
        }, 149000);
    }

    refreshToken(): void {
        
        this.authService.refreshToken().subscribe(res => {
            if (res != null) {
                
                if (this.authService.localstorage) {
                    localStorage.setItem('jwt', res['accessToken']);
                } else {
                    sessionStorage.setItem('jwt', res['accessToken']);
                }
            }
        });
    }

    //TODO: conformation for warning, ban,  dismiss (user reported)
    //TODO: Add new game
    //TODO: SupportTickter view
    //TODO: Styling button (icons add)
    //TODO: Automatic rerouting to /login if not logged in and trying to access games/friends/etc
}
