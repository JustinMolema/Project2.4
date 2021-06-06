import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReporteduserComponent} from './reporteduser.component';
import {UserComponent} from './user/user.component';
import {SharedmoduleModule} from '../../sharedmodule/sharedmodule.module';
import {TableheaderModule} from '../tableheader/tableheader.module';
import {LogComponent} from './log/log.component';
import {TabledataModule} from '../tabledata/tabledata.module';
import {AdmintopbarModule} from "../admintopbar/admintopbar.module";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
    declarations: [ReporteduserComponent, UserComponent, LogComponent],
    imports: [
        CommonModule,
        SharedmoduleModule,
        TableheaderModule,
        TabledataModule,
        AdmintopbarModule,
    ],
})
export class ReporteduserModule {
}
