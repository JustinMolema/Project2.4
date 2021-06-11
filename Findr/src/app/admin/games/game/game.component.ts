import { Component, Input, OnInit } from '@angular/core';
import { AdmindataService } from '../../admindata.service';
import { GamesService } from '../games.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    @Input() game: any;
    @Input() keys = [];
    constructor(private admindataService: AdmindataService, private gamesService: GamesService) {
    }

    ngOnInit(): void {
    }

    delete(name: string): void {
        if (confirm('Are you sure you want to delete game: ' + name)) {
            alert('Item deleted');
            this.admindataService.deleteGame(name).subscribe(response => console.log(response));
        }
    }

    editGame(game: object): void{
        this.gamesService.editGame(game);
    }
}
