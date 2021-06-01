import {Component, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {relative} from 'node:path';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    numbers: number[];
    s = ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg'];
    stars = [];

    vh = window.screen.height / 2;
    vw = window.screen.width;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberme: [true]
        });

        for (let i = 0; i < 100; i++) {
            this.stars.push({left: this.getLeft(), top: this.getTop()});
        }
    }

    ngOnInit(): void {
    }

    getLeft(): string {
        return Math.floor((Math.random() * this.vw)) + 'px';
    }

    getTop(): string {
        return Math.floor(Math.random() * this.vh) + 'px';
    }

    login(): void {
        const val = this.form.value;
        if (this.tempValidateUser(val)) {
            this.loginToServer(val);
        } else {
            console.log('WRONG!');
        }
    }

    // Temp until server side validation is done
    tempValidateUser(val): boolean {
        return val.username === 'test' && val.password === 'test';
    }

    loginToServer(val): void {
        this.authService.login(val.username, val.password).subscribe(res => {
            this.setJWT(val.rememberme, res);
            this.router.navigate(['/games']);
        });
    }

    setJWT(rememberme: boolean, response): void {
        this.authService.localstorage = rememberme;

        if (rememberme) {
            localStorage.setItem('jwt', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
        } else {
            sessionStorage.setItem('jwt', response.accessToken);
            sessionStorage.setItem('refreshToken', response.refreshToken);
        }
    }

    getStyle(i: any): object {
        return {
            left: this.stars[i].left,
            top: this.stars[i].top,
            position: 'absolute'
        };
    }
}
