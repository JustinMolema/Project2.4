import { Component, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { relative } from 'node:path';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    numbers: Number[];
    s = ["0deg", "45deg", "90deg", "135deg", "180deg", "225deg", "270deg"];
    stars = [];

    constructor(private fb: FormBuilder,
        private authService: AuthService, private router: Router) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        console
        for (let i = 0; i < 100; i++) {
            this.stars.push({ left: this.getLeft(), top: this.getTop() });
        }
    }

    ngOnInit(): void {
    }

    vh = window.screen.height / 2;
    vw = window.screen.width;

    getLeft() {
        // return ("1900px");
        return Math.floor((Math.random() * this.vw)) + 'px';
        // return 21;
    }

    getTop() {
        console.log(this.vh + "     " + this.vw);
        return Math.floor(Math.random() * this.vh) + 'px';
    }

    login() {
        const val = this.form.value;
        console.log(val.username);
        if (val.username == "test" && val.password == "test") {
            if (val.username && val.password) {
                if (val.rememberme == false) {
                    this.authService.login(val.username, val.password).subscribe(res => {
                        sessionStorage.setItem('jwt', res["accessToken"]);
                        sessionStorage.setItem('refreshToken', res["refreshToken"]);
                        this.router.navigate(["/games"]);
                        this.authService.localstorage = false;
                        console.log(res)
                    });
                } 
                else {
                    this.authService.login(val.username, val.password).subscribe(res => {
                        localStorage.setItem('jwt', res["accessToken"]);
                        localStorage.setItem('refreshToken', res["refreshToken"]);
                        this.router.navigate(["/games"]);
                        console.log(res)
                    });
                }
                // this.authService.updateRememberMe(val.rememberme).subscribe(res => {
                // });


            }
        } else {
            console.log("WRONG!");
            
        }
    }

    getStyle(i: any) {
        return {
            'left': this.stars[i].left,
            'top': this.stars[i].top,
            'position': "absolute"
        }
    }
}
