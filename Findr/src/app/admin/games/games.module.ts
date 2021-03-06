import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { GamesComponent } from './games.component';
import { GameComponent } from './game/game.component';
import { TableheaderModule } from '../tableheader/tableheader.module';
import { NewgameComponent } from './newgame/newgame.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {TabledataModule} from '../tabledata/tabledata.module';
import {AdmintopbarModule} from "../admintopbar/admintopbar.module";

@NgModule({
  declarations: [
    GamesComponent,
    GameComponent,
    NewgameComponent
  ],
    imports: [
        CommonModule,
        SharedmoduleModule,
        TableheaderModule,
        RouterModule,
        ReactiveFormsModule,
        TabledataModule,
        AdmintopbarModule
    ]
})
export class GamesModule { }
