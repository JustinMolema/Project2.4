import {Component, OnInit} from '@angular/core';
import {GamesService} from '../../admin/games/games.service';
import {AdmindataService} from '../../admin/admindata.service';
import {AppService} from '../../app.service';
import {globalFindrMethods} from '../../sharedmodule/global.findr.methods';

@Component({
    selector: 'app-gamemenu',
    templateUrl: './gamemenu.component.html',
    styleUrls: ['./gamemenu.component.css']
})
export class GamemenuComponent implements OnInit {
    games = [];

    constructor(private admindataService: AdmindataService, private appService: AppService, private findrMethods: globalFindrMethods) {
        if (this.appService.favoriteGames.size === 0) this.getFavoriteGames();
        else this.getGames();
    }

    ngOnInit(): void {
    }

    getFavoriteGames(): void {
        this.appService.getFavoriteGames().subscribe(res => {
            this.fillFavoriteGames(res);
            this.getGames();
        });
    }

    getGames(): void {
        this.admindataService.getGames().subscribe(response => {
            this.fillData(response);
        });
    }

    fillFavoriteGames(res): void {
        for (const game of res) {
            this.appService.favoriteGames.set(game.Game, {image: "", name: game.Game});
        }
    }

    fillData(response: any): void {
        for (const game of response) {
            this.games.push(game);
            if (this.appService.favoriteGames.has(game.Name))
                this.appService.favoriteGames.get(game.Name).image = this.findrMethods.sanitize(decodeURIComponent(game.Image));
        }
    }
}
