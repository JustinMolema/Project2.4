import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { GamesComponent } from './games.component';
import { GameComponent } from './game/game.component';



@NgModule({
  declarations: [
    GamesComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
  ]
})
export class GamesModule { }
