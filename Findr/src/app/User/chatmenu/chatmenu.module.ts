import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatmenuComponent } from './chatmenu.component';
import { ChatmessageComponent } from './chatmessage/chatmessage.component';



@NgModule({
  declarations: [
    ChatmenuComponent,
    ChatmessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChatmenuComponent,
    ChatmessageComponent
  ]
})
export class ChatmenuModule { }
