import {ApplicationRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './User/login/auth.service';
import {ChatService} from './User/chatmenu/chat.service';
import {AppService} from './app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Findr';
    stable;

    constructor(public router: Router, private appService: AppService,
                private authService: AuthService, public chat: ChatService, private app: ApplicationRef, public route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.reroute();
        this.stabilizeListener();
    }

    ngOnDestroy(): void {
        this.chat.closeSocket();
    }

    reroute(): void {
        if (this.authService.userIsLoggedIn() && window.location.pathname.startsWith("/login")) this.router.navigate(['/games']);
        else if (!this.authService.userIsLoggedIn() && !window.location.pathname.startsWith("/admin")) this.router.navigate(['/login']);
    }

    stabilizeListener(): void {
        this.stable = this.app.isStable.subscribe((isStable) => {
            if (isStable) {
                this.authService.setRefreshInterval();
                if (this.authService.userIsLoggedIn()) {
                    this.chat.getAllFriends();
                    this.chat.openSocket();
                }
                this.stable.unsubscribe();
            }
        });
    }
}
