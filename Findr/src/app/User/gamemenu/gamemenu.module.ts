import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamemenuComponent} from './gamemenu.component';
import {GameComponent} from './game/game.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        GamemenuComponent,
        GameComponent
    ],
    imports: [
        CommonModule,
        MatTooltipModule,
    ], exports: [
        GamemenuComponent,
        GameComponent,
    ]
})
export class GamemenuModule {
}
