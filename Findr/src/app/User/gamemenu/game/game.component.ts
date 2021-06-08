import {Component, Input, OnInit} from '@angular/core';
import {DialogComponent} from '../../../sharedmodule/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game;

    constructor(private router: Router, private dialog: MatDialog) {
    }

    ngOnInit(): void {
    }

    gameclick(): void{
        this.router.navigate(["chats/" + this.game.Name]);
        // const dialogRef = this.dialog.open(DialogComponent, {
        //     width: '300px',
        // });
        // console.log("ddd");
    }
}
