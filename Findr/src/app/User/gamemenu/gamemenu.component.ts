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

    constructor(public appService: AppService) {
    }

    ngOnInit(): void {
    }
}
