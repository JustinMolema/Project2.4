import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;
    form: FormGroup;

    accounts = [{ naam: "PeterJanmetdehondindepan", wachtwoord: "johnpakthemindekont" }];

    constructor(private fb: FormBuilder,
        private authService: AuthService) {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit(): void { }

    login() {
        const val = this.form.value;

        if (val.email == "test" && val.password == "test") {
            if (val.email && val.password) {
                this.authService.login(val.email, val.password).subscribe(res => {
                    localStorage.setItem('jwt', res["accessToken"]);
                    console.log(res["refreshToken"]);

                });

                if (val.email && val.password) {
                    this.authService.testding(val.email, val.password).subscribe(res => console.log(res));
                }
            }
            else {
                console.log("WRONG!");
            }


        }
    }
    secret() {
        this.authService.refreshToken().subscribe(res => console.log(res));
    }
}