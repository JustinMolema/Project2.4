import {Component, Input, OnInit} from '@angular/core';
import {DialogComponent} from '../../../sharedmodule/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChatService} from '../../chatmenu/chat.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game;
    dbPicture;
    constructor(private router: Router, private dialog: MatDialog, private chat: ChatService, private sanitiser: DomSanitizer) {
    }

    ngOnInit(): void {
        this.dbPicture = this.sanitize(decodeURIComponent(this.game.Image));
    }

    sanitize(url: string): SafeResourceUrl {
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }

    gameclick(): void{
        this.chat.private = false;
        this.router.navigate(["chats/" + this.game.Name]);
    }
}
