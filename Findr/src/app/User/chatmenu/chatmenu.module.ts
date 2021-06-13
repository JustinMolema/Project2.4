import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatmenuComponent} from './chatmenu.component';
import {ChatmessageComponent} from './chatmessage/chatmessage.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        ChatmenuComponent,
        ChatmessageComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        RouterModule,
    ],
    exports: [
        ChatmenuComponent,
        ChatmessageComponent
    ]
})
export class ChatmenuModule {
}
