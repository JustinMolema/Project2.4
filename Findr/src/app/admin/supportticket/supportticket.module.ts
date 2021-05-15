import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SupportticketComponent } from './supportticket.component';
import { TicketComponent } from './ticket/ticket.component';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [SupportticketComponent, TicketComponent],
  imports: [
    CommonModule,
    SharedmoduleModule
  ],
})
export class SupportticketModule { }
