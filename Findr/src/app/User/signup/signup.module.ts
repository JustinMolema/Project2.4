import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoginModule
  ], exports: [
      SignupComponent
  ]
})
export class SignupModule { }
