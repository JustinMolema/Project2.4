import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportticketComponent } from './supportticket.component';
import { TicketComponent } from './ticket/ticket.component';
import { FilterPipe } from './filter.pipe';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SupportticketComponent, TicketComponent, FilterPipe],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SupportticketModule { }
