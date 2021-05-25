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

    ngOnInit(){ 
        this.refreshToken();
        this.setRefreshInterval();
    }

    setRefreshInterval(): void{
        setInterval(() => {
            if(this.authService.refreshTokenInterval)
            {
                this.refreshToken();
            }
            // 1499000
        }, 1000);
    }

    refreshToken(): void{
        console.log("refresh dat shit");
        this.authService.refreshToken().subscribe(res => {
            if(res != null)
            {
                localStorage.setItem('jwt', res['accessToken'])
            }
        });
    }

    //TODO: conformation for warning, ban,  dismiss (user reported)
    //TODO: Add new game
    //TODO: SupportTickter view
    //TODO: Styling button (icons add)
    //TODO: Automatic rerouting to /login if not logged in and trying to access games/friends/etc
}
