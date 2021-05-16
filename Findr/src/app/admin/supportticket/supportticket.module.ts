import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SupportticketComponent } from './supportticket.component';
import { TicketComponent } from './ticket/ticket.component';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { TableheaderModule } from '../tableheader/tableheader.module';

@NgModule({
  declarations: [SupportticketComponent, TicketComponent],
  imports: [
    CommonModule,
    SharedmoduleModule,
    TableheaderModule
  ],
  exports: [TicketComponent]
})
export class SupportticketModule { }
