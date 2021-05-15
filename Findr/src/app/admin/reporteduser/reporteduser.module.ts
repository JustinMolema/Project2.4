import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReporteduserComponent } from './reporteduser.component';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { FilterReportedUsersPipe } from './filter-reported-users.pipe';
import { HightlightSearchDirective } from './hightlight-search.directive';


@NgModule({
  declarations: [ReporteduserComponent, UserComponent, FilterReportedUsersPipe, HightlightSearchDirective,],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class ReporteduserModule { }
