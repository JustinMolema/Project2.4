import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordforgottenComponent } from './passwordforgotten.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';



@NgModule({
  declarations: [
    PasswordforgottenComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoginModule
  ], exports:[
      PasswordforgottenComponent,
  ]
})
export class PasswordforgottenModule { }
