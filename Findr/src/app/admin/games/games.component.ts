import { Component, OnInit } from '@angular/core';
import { AdmindataService } from '../admindata.service';
import { GamesService } from './games.service';
import { Admindata } from '../admindata';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesComponent extends Admindata implements OnInit {
    addingNewGame = false;

    constructor(public admindataService: AdmindataService, private gamesService: GamesService) {
        super(null, admindataService);
        this.gamesService.setGameComponent(this);
    }

    ngOnInit(): void {
    }

    getData(): void {
        this.admindataService.getGames().subscribe(response => {
            this.fillData(response);
            this.allowViewToLoad(["Name", "Category", "subscribercount"]);
        });
    }

    clearGames(): void {
        this.keys = [];
        this.items = [];
        this.isLoaded = false;
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
