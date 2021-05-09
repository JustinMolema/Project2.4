import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsmenuComponent } from './friendsmenu.component';
import { FriendComponent } from './friend/friend.component';
import { FriendrequestsComponent } from './friendrequests/friendrequests.component';
import { BlockedusersComponent } from './blockedusers/blockedusers.component';


@NgModule({
  declarations: [
    FriendsmenuComponent,
    FriendComponent,
    FriendrequestsComponent,
    BlockedusersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FriendsmenuModule { }
