import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { SharedmoduleModule } from '../../sharedmodule/sharedmodule.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedmoduleModule,
  ]
})
export class UsersModule { }
