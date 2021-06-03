import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sha512 } from 'js-sha512';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    username: "";
    constructor(private appService: AppService, private fb: FormBuilder,) {
        this.form = this.fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            email : ['', Validators.compose([Validators.required, Validators.email])],
        }, {
            validator: this.mustMatch('password', 'confirmPassword')
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): boolean {
        const val = this.form.value;
        var hash = sha512.create();
        const hashedPassword = hash.update(val.password);
        console.log(hashedPassword.hex());
        this.appService.signUp(val.username, hashedPassword.hex(), val.email).subscribe(res => {
            return true;
        })
        return false;
    }

    mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
    
            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }
    
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

}
