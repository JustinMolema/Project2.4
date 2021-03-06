import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { GameslistComponent } from './gameslist/gameslist.component';
import { FriendslistComponent } from './friendslist/friendslist.component';

@NgModule({
  declarations: [
    NavbarComponent,
    GameslistComponent,
    FriendslistComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FriendslistComponent,
    GameslistComponent
  ]
})
export class NavbarModule { }
