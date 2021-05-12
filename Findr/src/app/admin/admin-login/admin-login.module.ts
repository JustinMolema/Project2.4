import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import {RouterModule, Router} from "@angular/router";
import { ProviderAstType } from '@angular/compiler';
import { WrongPasswordHandler } from './wrongpasswordhandler';

@NgModule({
  declarations: [
    AdminLoginComponent,
  ],
  providers: [{ provide: ErrorHandler, useClass: WrongPasswordHandler }],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class AdminLoginModule {

    constructor(){
        
    }

 }
