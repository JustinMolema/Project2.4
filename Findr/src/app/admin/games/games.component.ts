import { Component, OnInit } from '@angular/core';
import { AdmindataService } from '../admindata.service';
import { GamesService } from './games.service';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
    searchText: string;
    max: Number;
    isLoaded: boolean;
    addingNewGame = false;

    keys = [];
    games = [];

    constructor(private admindataService: AdmindataService, private gamesService: GamesService) {
        this.gamesService.setGameComponent(this);
        this.getGames();
    }

    ngOnInit(): void {

    }

    getGames() {
        this.admindataService.getGames().subscribe(response => {
            this.fillGames(response);
            this.allowViewToLoad();
        });
    }

    fillGames(response: any): void {
        for (let game of response) {
            this.games.push(game);
        }
    }

    allowViewToLoad() {
        this.keys = ["Name", "Category", "subscribercount"] //Object.keys(this.games[0]);
        this.isLoaded = true;
    }

    clearGames() {
        this.keys = [];
        this.games = [];
        this.isLoaded = false;
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;

        this.max = this.games.length;
    }

    get getReturnToGames() {
        return this.returnToGames.bind(this);
    }

    returnToGames() {
        this.clearGames();
        this.getGames();
        this.addingNewGame = false;
    }

    editGame(game){
        this.addingNewGame = true;
    }
}
