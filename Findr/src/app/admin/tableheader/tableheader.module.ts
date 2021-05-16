import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableheaderComponent } from './tableheader.component';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';



@NgModule({
  declarations: [
    TableheaderComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule
  ],
  exports:[TableheaderComponent]
})
export class TableheaderModule { }
