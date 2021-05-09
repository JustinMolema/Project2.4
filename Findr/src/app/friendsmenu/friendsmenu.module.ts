import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsmenuComponent } from './friendsmenu.component';
import { FriendComponent } from './friend/friend.component';
import { FriendrequestsComponent } from './friendrequests/friendrequests.component';
import { BlockedusersComponent } from './blockedusers/blockedusers.component';
import {AppRoutingModule} from "../app-routing.module";


@NgModule({
  declarations: [
    FriendsmenuComponent,
    FriendComponent,
    FriendrequestsComponent,
    BlockedusersComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule
    ]
})
export class FriendsmenuModule { }
