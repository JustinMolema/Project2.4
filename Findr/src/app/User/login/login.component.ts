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
            this.stars.push({left: this.getLeft(), top: this.getTop()});
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
        return Math.floor(Math.random() * this.vh ) + 'px';
    }

    login() {
        const val = this.form.value;

        if (val.username == "test" && val.password == "test") {
            if (val.username && val.password) {
                this.authService.login(val.username, val.password).subscribe(res => {
                    localStorage.setItem('jwt', res["accessToken"]);
                    localStorage.setItem('refreshToken', res["refreshToken"]);
                    console.log(res)
                });
                //TODO: add navigation to games page
                this.router.navigate(["/games"]);
            }
        }
        else {
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

    secret() {
        console.log("PLEASE WORK I BEG YOU1");
        this.authService.refreshToken().subscribe(res => {
            localStorage.setItem('jwt', res['accessToken'])
            console.log("PLEASE WORK I BEG YOU2");
        });
    }
}