import {ApplicationRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./User/login/auth.service";
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

    constructor(public router: Router, private authService: AuthService, public chat: ChatService, private app: ApplicationRef) {
    }

    ngOnInit(): void {
        this.stabilizeListener();
    }

    ngOnDestroy(): void {
        this.chat.closeSocket();
    }

    stabilizeListener(): void {
        this.stable = this.app.isStable.subscribe((isStable) => {
            if (isStable) {
                this.authService.setRefreshInterval();
                if (this.authService.userIsLoggedIn()) this.chat.createAndOpenSocket();
                this.stable.unsubscribe();
            }
        });
    }
}
