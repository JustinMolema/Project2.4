import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {ChatService} from '../../chatmenu/chat.service';
import {globalFindrMethods} from "../../../sharedmodule/global.findr.methods";
import {AppService} from '../../../app.service';


@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game;
    dbPicture;
    favorite = false;
    constructor(private router: Router, private dialog: MatDialog, private chat: ChatService,
                private findrMethods: globalFindrMethods, private appService: AppService) {
    }

    ngOnInit(): void {
        if (this.appService.favoriteGames.has(this.game.Name)) this.favorite = true;
        this.dbPicture = this.game.Image;
    }

    setFavorite(): void {
        if (!this.favorite) this.addFavoriteGame();
        else this.deleteFavoriteGame();
        this.favorite = !this.favorite;
    }

    addFavoriteGame(): void {
        this.appService.favoriteGames.set(this.game.Name, {name: this.game.Name, image: this.dbPicture});
        this.appService.setFavorite(this.game.Name).subscribe();
    }

    deleteFavoriteGame(): void {
        this.appService.favoriteGames.delete(this.game.Name);
        this.appService.deleteFavorite(this.game.Name).subscribe();
    }

    gameclick(): void {
        this.chat.private = false;
        this.router.navigate(["chats/" + this.game.Name]);
    }
}
