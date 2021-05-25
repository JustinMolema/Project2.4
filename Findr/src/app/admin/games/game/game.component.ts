import { Component, Input, OnInit } from '@angular/core';
import { AdmindataService } from '../../admindata.service';
import { GamesService } from '../games.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    _game: any;

    constructor(private admindataService: AdmindataService, private gamesService: GamesService) { 
    }

    ngOnInit(): void {
    }

    @Input()
    set game(game: any){
        this._game = game;
    }
    
    get game(){
        return this._game;
    }

    delete(name: string): void {
        if (confirm("Are you sure you want to delete game: " + name)) {
            alert("Item deleted");
            console.log(typeof(name))
            this.admindataService.deleteGame(name).subscribe(response => console.log(response));
        }
    }

    editGame(game: object){
        this.gamesService.editGame(game);
    }
}