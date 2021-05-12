import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteduserComponent } from './reporteduser.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [ReporteduserComponent, UserComponent],
  imports: [
    CommonModule
  ]
})
export class ReporteduserModule { }
