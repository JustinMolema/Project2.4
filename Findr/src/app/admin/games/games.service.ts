import { Injectable } from '@angular/core';
import { GamesComponent } from './games.component';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    gameComponent: GamesComponent
    constructor() { }

    setGameComponent(gameComponent: GamesComponent){
        this.gameComponent = gameComponent;
    }

    editGame(game) {
        this.gameComponent.editGame(game);
    }
}
