import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChatService} from '../../chatmenu/chat.service';
import {globalFindrMethods} from "../../../sharedmodule/global.findr.methods";


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game;
    dbPicture;
    constructor(private router: Router, private dialog: MatDialog, private chat: ChatService, private findrMethods: globalFindrMethods) {
    }

    ngOnInit(): void {
        this.dbPicture = this.findrMethods.sanitize(decodeURIComponent(this.game.Image));
    }

    gameclick(): void{
        this.chat.private = false;
        this.router.navigate(["chats/" + this.game.Name]);
    }
}
