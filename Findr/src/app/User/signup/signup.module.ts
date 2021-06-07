import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from './signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {LoginModule} from '../login/login.module';


@NgModule({
    declarations: [
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        LoginModule,
        ReactiveFormsModule,
    ], exports: [
        SignupComponent
    ]
})
export class SignupModule {
}
