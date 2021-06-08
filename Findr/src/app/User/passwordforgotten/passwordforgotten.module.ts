import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordforgottenComponent} from './passwordforgotten.component';
import {RouterModule} from '@angular/router';
import {LoginModule} from '../login/login.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        PasswordforgottenComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        LoginModule,
        FormsModule,
        ReactiveFormsModule
    ], exports: [
        PasswordforgottenComponent,
    ]
})
export class PasswordforgottenModule {
}
