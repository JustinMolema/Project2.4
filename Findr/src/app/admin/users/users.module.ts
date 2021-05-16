import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';
import { TableheaderModule } from '../tableheader/tableheader.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
    TableheaderModule
  ]
})
export class UsersModule { }
