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
    game;
    header = "NEW";

    constructor(public admindataService: AdmindataService, private gamesService: GamesService) {
        super(null, admindataService);
        this.gamesService.setGameComponent(this);
    }

    ngOnInit(): void {
    }

    getData(): void {
        this.admindataService.getGames().subscribe(response => {
            console.log(typeof response);

            this.fillData(response);
            this.allowViewToLoad(["Name", "Category", "Description"]);
        });
    }

    clearGames(): void {
        this.keys = [];
        this.items = [];
        this.isLoaded = false;
        this.game = null;
        this.header = "NEW";
    }

    get getReturnToGames(): any {
        return this.returnToGames.bind(this);
    }

    returnToGames(): void {
        this.clearGames();
        this.getData();

        this.addingNewGame = false;
    }

    editGame(game): any {
        this.header = "EDIT";
        this.game = game;
        this.addingNewGame = true;
    }
}
