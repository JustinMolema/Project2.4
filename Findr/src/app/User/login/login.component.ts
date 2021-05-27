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
    
    form: FormGroup;

    accounts = [{ naam: "PeterJanmetdehondindepan", wachtwoord: "johnpakthemindekont" }];

    constructor(private fb: FormBuilder,
        private authService: AuthService, private router: Router) {
        this.form = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            rememberme: [false]
        });
    }

    ngOnInit(): void { }

    login() {
        const val = this.form.value;

        if (val.email == "test" && val.password == "test") {
            if (val.email && val.password) {
                this.authService.updateRememberMe(val.rememberme).subscribe(res => {
                });

                this.authService.login(val.email, val.password).subscribe(res => {
                    localStorage.setItem('jwt', res["accessToken"]);
                    localStorage.setItem('refreshToken', res["refreshToken"]);
                    console.log(res)});
                    this.router.navigate(["/games"]);
            }
        }
        else {
            console.log("WRONG!");
        }
    }

    // secret() {
    //     this.authService.refreshToken().subscribe(res => {
    //         localStorage.setItem('jwt', res['accessToken'])
    //     });
    // }
}