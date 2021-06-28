import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sha512} from 'js-sha512';
import {AppService} from 'src/app/app.service';
import {globalFindrMethods} from '../../sharedmodule/global.findr.methods'
import {Router} from "@angular/router";

// TODO on submit, go to login page.

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    form: FormGroup;
    username: '';
    error = false;

    constructor(private appService: AppService, private fb: FormBuilder, private router: Router, private findrMethods: globalFindrMethods) {
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
            validator: this.findrMethods.mustMatch('password', 'confirmPassword')
        });
    }

    onSubmit(): void {
        const val = this.form.value;
        const hash = sha512.create();
        hash.update(val.password);
        const encryptedpassword = hash.hex();

        this.appService.signUp(val.username, encryptedpassword, val.email).subscribe(res => {
            if (res.status === 200) {
                this.router.navigate(['/login']);
            } else if (res.status === 400) {
                this.error = true;
            }
        });
    }
}
