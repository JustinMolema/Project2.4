import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteduserComponent } from './reporteduser.component';
import { UserComponent } from './user/user.component';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';

@NgModule({
  declarations: [ReporteduserComponent, UserComponent,],
  imports: [
    CommonModule,
    SharedmoduleModule
  ],
})
export class ReporteduserModule { }
