import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordforgottenComponent } from './passwordforgotten.component';



@NgModule({
  declarations: [
    PasswordforgottenComponent
  ],
  imports: [
    CommonModule
  ], exports:[
      PasswordforgottenComponent,
  ]
})
export class PasswordforgottenModule { }
