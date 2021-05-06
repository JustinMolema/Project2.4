import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { FriendsComponent } from './friends/friends.component';
import { GamesComponent } from './games/games.component';
import { ChatsComponent } from './chats/chats.component';
import { ListeditemsComponent } from './listeditems/listeditems.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FriendsComponent,
    GamesComponent,
    ChatsComponent,
    ListeditemsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    GamesComponent,
    ChatsComponent,
    ListeditemsComponent,
    FriendsComponent
  ]
})
export class NavbarModule { }
