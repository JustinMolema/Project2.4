import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportticketComponent } from './supportticket.component';
import { TicketComponent } from './ticket/ticket.component';



@NgModule({
  declarations: [SupportticketComponent, TicketComponent],
  imports: [
    CommonModule
  ]
})
export class SupportticketModule { }
