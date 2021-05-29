import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { ListeditemsComponent } from './listeditems/listeditems.component';
import { GameslistComponent } from './gameslist/gameslist.component';
import { FriendslistComponent } from './friendslist/friendslist.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ListeditemsComponent,
    GameslistComponent,
    FriendslistComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ListeditemsComponent,
    FriendslistComponent,
    GameslistComponent
  ]
})
export class NavbarModule { }
//TODO: Center buttons
//TODO: Friend/chat/profile view PWA
