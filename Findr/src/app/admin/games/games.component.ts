import { Component, OnInit } from '@angular/core';
import { AdmindataService } from '../admindata.service';
import { GamesService } from './games.service';
import { Admindata } from '../admindata';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, Admindata {
    searchText: string;
    max: number;
    isLoaded: boolean;
    addingNewGame = false;

    keys = [];
    games = [];

    constructor(private admindataService: AdmindataService, private gamesService: GamesService) {
        this.gamesService.setGameComponent(this);
        this.getData();
    }

    ngOnInit(): void {

    }

    getData(): void {
        this.admindataService.getGames().subscribe(response => {
            this.fillData(response);
            this.allowViewToLoad();
        });
    }

    fillData(response: any): void {
        for (let game of response) {
            this.games.push(game);
        }
    }

    allowViewToLoad(): void {
        this.keys = ["Name", "Category", "subscribercount"] //Object.keys(this.games[0]);
        this.isLoaded = true;
    }

    clearGames(): void {
        this.keys = [];
        this.games = [];
        this.isLoaded = false;
    }

    changeEvent(max: number): any {
        if (max > 1) return this.max = max;

        this.max = this.games.length;
    }

    get getReturnToGames(): any {
        return this.returnToGames.bind(this);
    }

    returnToGames(): void {
        this.clearGames();
        this.getData();
        this.addingNewGame = false;
    }

    editGame(game): any{
        this.addingNewGame = true;
    }
}
