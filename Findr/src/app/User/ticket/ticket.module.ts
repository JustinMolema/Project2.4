import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    TicketComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ], exports: [
      TicketComponent
    ]
})
export class TicketModule { }
