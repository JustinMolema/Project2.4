import { Component, Input, OnInit } from '@angular/core';
import { AdmindataService } from '../../admindata.service';
import { GamesService } from '../games.service';
import {AdminRow} from '../../AdminRow';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent extends AdminRow implements OnInit {
    @Input() item: any;
    @Input() keys = [];

    constructor(public snackBar: MatSnackBar, public dialog: MatDialog,
                public admindataService: AdmindataService, private gamesService: GamesService) {
        super(snackBar, dialog, admindataService);
    }

    ngOnInit(): void {
    }

    setUndoTimer(): void {
        this.undoTimer = setTimeout(() => {
            this.admindataService.deleteGame(this.item.Name).subscribe();
        }, 4000);
    }

    editGame(game: object): void{
        this.gamesService.editGame(game);
    }
}
