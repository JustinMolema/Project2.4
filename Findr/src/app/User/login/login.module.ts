import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JupiterComponent } from './jupiter/jupiter.component';


@NgModule({
    declarations: [LoginComponent, JupiterComponent],
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    exports: [LoginComponent, JupiterComponent],
})
export class LoginModule {
}

