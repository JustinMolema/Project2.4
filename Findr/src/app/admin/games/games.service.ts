import {Injectable} from '@angular/core';
import {GamesComponent} from './games.component';

@Injectable({
    providedIn: 'root'
})
export class GamesService {
    gameComponent: GamesComponent;

    constructor() {
    }

    setGameComponent(gameComponent: GamesComponent): void {
        this.gameComponent = gameComponent;
    }

    editGame(game): void {
        this.gameComponent.editGame(game);
    }
}
