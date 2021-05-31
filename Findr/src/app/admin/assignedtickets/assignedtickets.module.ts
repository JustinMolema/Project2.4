import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssignedticketsComponent} from './assignedtickets.component';
import {SharedmoduleModule} from '../../sharedmodule/sharedmodule.module';
import {TableheaderModule} from '../tableheader/tableheader.module';
import {SupportticketModule} from '../supportticket/supportticket.module';
import {TabledataModule} from "../tabledata/tabledata.module";


@NgModule({
    declarations: [
        AssignedticketsComponent
    ],
    imports: [
        CommonModule,
        SharedmoduleModule,
        TableheaderModule,
        SupportticketModule,
        TabledataModule
    ]
})
export class AssignedticketsModule {
}
