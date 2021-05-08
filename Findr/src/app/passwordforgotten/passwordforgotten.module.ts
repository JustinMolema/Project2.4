import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordforgottenComponent } from './passwordforgotten.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PasswordforgottenComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports:[
      PasswordforgottenComponent,
  ]
})
export class PasswordforgottenModule { }
