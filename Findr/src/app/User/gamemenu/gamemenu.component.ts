import {Component, OnInit} from '@angular/core';
import {GamesService} from '../../admin/games/games.service';
import {AdmindataService} from '../../admin/admindata.service';

@Component({
    selector: 'app-gamemenu',
    templateUrl: './gamemenu.component.html',
    styleUrls: ['./gamemenu.component.css']
})
export class GamemenuComponent implements OnInit {
    games = [];

    constructor(private admindataService: AdmindataService) {
        this.admindataService.getGames().subscribe(res => {
            this.fillData(res);
        });
    }

    ngOnInit(): void {
    }

    fillData(response: any): void {
        for (const game of response) {
            this.games.push(game);
        }
    }
}
