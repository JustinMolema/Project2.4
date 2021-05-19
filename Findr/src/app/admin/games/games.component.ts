import { Component, OnInit } from '@angular/core';
import { AdmindataService} from '../admindata.service';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
    searchText: string;
    max: Number;
    isLoaded: boolean;

    keys = [];
    games = [
    ];
    constructor(private admindataService: AdmindataService) {
        // this.admindataService.getGames().subscribe(response => {
        //     this.fillGames(response);
        //     this.allowViewToLoad();
        // });

        // this.admindataService.addGame("dit","dat", "nani").subscribe(response => {
        //     console.log(response);
        // });

        this.admindataService.deleteGame("x").subscribe(result => {
            console.log(result)
          },
          error => {
            console.log(error);
          });
    }

    ngOnInit(): void {

    }

    fillGames(response: any): void {
        for (let game of response) {
            this.games.push({ name: game["GameName"], category: game["Category"], subscribercount: 5 })
        }
    }

    allowViewToLoad() {
        this.keys = Object.keys(this.games[0]);
        this.isLoaded = true;
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;

        this.max = this.games.length;
    }
}
