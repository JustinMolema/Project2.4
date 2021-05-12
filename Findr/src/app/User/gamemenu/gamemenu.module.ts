import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamemenuComponent } from './gamemenu.component';
import { GameComponent } from './game/game.component';



@NgModule({
  declarations: [
    GamemenuComponent,
    GameComponent
  ],
  imports: [
    CommonModule
  ], exports:[
      GamemenuComponent,
      GameComponent
  ]
})
export class GamemenuModule { }
