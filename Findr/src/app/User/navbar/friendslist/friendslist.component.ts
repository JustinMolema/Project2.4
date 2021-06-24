import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../../app.service';
import {TopbarService} from '../../topbar/topbar.service';
import {NavbarService} from "../navbar.service";
import {ChatService} from "../../chatmenu/chat.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-friendslist',
    templateUrl: './friendslist.component.html',
    styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {
    collapsed = true;
    showMoreText = 'Show More ⬎';
    sliceAmount = 5;
    topbar: TopbarService;

    constructor(private topbarService: TopbarService, public appService: AppService,
                private navbarService: NavbarService, private chat: ChatService, private router: Router) {
        this.topbar = topbarService;
    }

    ngOnInit(): void {

    }

    toggleList(): void {
        if (this.collapsed) {
            this.sliceAmount = this.appService.friends.length;
            this.showMoreText = 'Show Less ⬏';
        } else {
            this.sliceAmount = 5;
            this.showMoreText = 'Show More ⬎';
        }

        this.collapsed = !this.collapsed;

        if (this.collapsed){

        }
    }

    startChat(friendID): void {
        this.chat.private = true;
        this.chat.receiverID = friendID;
        this.router.navigate(['chats/']);
    }
}
