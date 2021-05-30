import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReporteduserComponent} from './reporteduser.component';
import {UserComponent} from './user/user.component';
import {SharedmoduleModule} from '../../sharedmodule/sharedmodule.module';
import {TableheaderModule} from '../tableheader/tableheader.module';
import {LogComponent} from './log/log.component';
import {TabledataModule} from '../tabledata/tabledata.module';

@NgModule({
    declarations: [ReporteduserComponent, UserComponent, LogComponent],
    imports: [
        CommonModule,
        SharedmoduleModule,
        TableheaderModule,
        TabledataModule
    ],
})
export class ReporteduserModule {
}
