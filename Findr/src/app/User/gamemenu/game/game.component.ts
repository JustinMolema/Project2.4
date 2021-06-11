import {Component, Input, OnInit} from '@angular/core';
import {DialogComponent} from '../../../sharedmodule/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChatService} from '../../chatmenu/chat.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game;

    constructor(private router: Router, private dialog: MatDialog, private chat: ChatService) {
    }

    ngOnInit(): void {
    }

    gameclick(): void{
        this.chat.private = false;
        this.router.navigate(["chats/" + this.game.Name]);
    }
}
