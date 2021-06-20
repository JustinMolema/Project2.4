import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sha512} from 'js-sha512';
import {AppService} from 'src/app/app.service';
import {mustMatch} from '../../custom.validators'

//TODO on submit, go to login page.

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    username: '';

    constructor(private appService: AppService, private fb: FormBuilder) {
        this.createForm();
    }

    ngOnInit(): void {
    }

    createForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            confirmPassword: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
        }, {
            validator: mustMatch('password', 'confirmPassword')
        });
    }

    onSubmit(): void {
        const val = this.form.value;
        const hash = sha512.create();
        hash.update(val.password);
        const encryptedpassword = hash.hex();

        this.appService.signUp(val.username, encryptedpassword, val.email).subscribe();
    }
}
