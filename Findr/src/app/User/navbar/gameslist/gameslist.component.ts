import {Component, Input, OnInit} from '@angular/core';
import {TopbarService} from '../../topbar/topbar.service';
import {ChatService} from "../../chatmenu/chat.service";
import {Router} from "@angular/router";
import {AppService} from "../../../app.service";

@Component({
    selector: 'app-gameslist',
    templateUrl: './gameslist.component.html',
    styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit {
    games = [];
    collapsed = true;
    showMoreText = "Show More ⬎";
    sliceAmount = 5;
    topbar: TopbarService;
    dbPicture;

    constructor(private topbarService: TopbarService, private chat: ChatService, private router: Router, public appService: AppService) {
        this.topbar = topbarService;
    }

    ngOnInit(): void {
    }

    toggleList(): void {
        if (this.collapsed) {
            this.showMoreText = "Show Less ⬏";
            this.sliceAmount = this.appService.games.length;
        } else {
            this.showMoreText = "Show More ⬎";
            this.sliceAmount = 5;
        }

        this.collapsed = !this.collapsed;
    }

    gameclick(gameName): void {
        console.log(this.appService.games);
        this.chat.private = false;
        this.router.navigate(["chats/" + gameName]);
    }
}
