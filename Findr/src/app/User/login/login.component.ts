import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { sha512 } from 'js-sha512';

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
        this.createForm();

        for (let i = 0; i < 100; i++) {
            this.stars.push({left: this.getLeft(), top: this.getTop()});
        }
    }

    createForm(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberme: [true]
        });
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

        this.loginToServer(val);

    }

    loginToServer(val): void {
        const hash = sha512.create();
        hash.update(val.password);
        const encryptedpassword = hash.hex();

        this.authService.login(val.username, encryptedpassword).subscribe(res => {
            if (res.status === "ok")
            {
                this.setJWT(val.rememberme, res);
                this.router.navigate(['/games']);
            }
            else if (res.status === "error") {
                console.log("error");
            }

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
