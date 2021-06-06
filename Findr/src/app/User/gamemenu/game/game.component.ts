import {Component, Input, OnInit} from '@angular/core';
import {DialogComponent} from '../../../sharedmodule/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game;

    constructor(private dialog: MatDialog) {
    }

    ngOnInit(): void {
        console.log(this.game);
    }

    gameclick(): void{
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '300px',
        });
        console.log("ddd");
    }
}
