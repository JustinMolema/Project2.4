import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.game);
    }

    gameclick(): void{
        console.log("ddd");
    }
}
