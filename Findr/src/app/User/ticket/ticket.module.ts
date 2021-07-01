import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    TicketComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ], exports: [
      TicketComponent
    ]
})
export class TicketModule { }
