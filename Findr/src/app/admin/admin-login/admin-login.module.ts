import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import {RouterModule, Router} from "@angular/router";
import { ProviderAstType } from '@angular/compiler';
import { WrongPasswordHandler } from './wrongpasswordhandler';
import { LoginModule } from '../../User/login/login.module';

@NgModule({
  declarations: [
    AdminLoginComponent,
  ],
  providers: [{ provide: ErrorHandler, useClass: WrongPasswordHandler }],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        RouterModule,
        LoginModule,
        ReactiveFormsModule
    ]
})
export class AdminLoginModule {

    constructor(){

    }

 }
