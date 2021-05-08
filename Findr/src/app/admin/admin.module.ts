import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ReporteduserComponent } from './reporteduser/reporteduser.component';
import { SupportticketComponent } from './supportticket/supportticket.component';



@NgModule({
  declarations: [
    AdminComponent,
    ReporteduserComponent,
    SupportticketComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
