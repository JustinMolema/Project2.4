import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatmenuComponent} from './chatmenu.component';
import {ChatmessageComponent} from './chatmessage/chatmessage.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        ChatmenuComponent,
        ChatmessageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        ChatmenuComponent,
        ChatmessageComponent
    ]
})
export class ChatmenuModule {
}
