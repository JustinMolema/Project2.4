import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GamemenuComponent} from './gamemenu.component';
import {GameComponent} from './game/game.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        GamemenuComponent,
        GameComponent
    ],
    imports: [
        CommonModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ], exports: [
        GamemenuComponent,
        GameComponent,
    ]
})
export class GamemenuModule {
}
