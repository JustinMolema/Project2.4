import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabledataComponent} from './tabledata.component';


@NgModule({
    declarations: [
        TabledataComponent
    ],
    imports: [
        CommonModule
    ],
    exports:[TabledataComponent]
})
export class TabledataModule {
}
