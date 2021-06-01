import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {UserComponent} from './user/user.component';
import {SharedmoduleModule} from '../../sharedmodule/sharedmodule.module';
import {TableheaderModule} from '../tableheader/tableheader.module';
import {TabledataModule} from '../tabledata/tabledata.module';
import {AdmintopbarModule} from "../admintopbar/admintopbar.module";


@NgModule({
    declarations: [
        UsersComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        SharedmoduleModule,
        TableheaderModule,
        TabledataModule,
        AdmintopbarModule
    ]
})
export class UsersModule {
}
