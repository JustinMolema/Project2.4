import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {sha512} from 'js-sha512';
import {ChatService} from '../chatmenu/chat.service';

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
    error = false;


    vh = window.screen.height / 2;
    vw = window.screen.width;

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private chat: ChatService) {
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
        this.loginToServer(val);
    }

    loginToServer(val): void {
        const hash = sha512.create();
        hash.update(val.password);
        const encryptedpassword = hash.hex();
        console.log(val.rememberme);
        this.authService.login(val.username, encryptedpassword).subscribe(res => {
            if (res.status === 200) {
                localStorage.setItem('userID', res.userID);
                localStorage.setItem('rememberme', val.rememberme);
                this.setJWT(val.rememberme, res);
                this.router.navigate(['/games']);
                this.chat.getAllFriends();
                this.chat.openSocket();
                this.authService.setRefreshInterval();
            } else if (res.status === "error") {
                this.error = true;
            }
        });
    }

    setJWT(rememberme: boolean, response): void {
        if (!rememberme) this.authService.storage = sessionStorage;
        else this.authService.storage = localStorage;
        this.authService.writeTokens(response);
    }

    getStyle(i: any): object {
        return {
            left: this.stars[i].left,
            top: this.stars[i].top,
            position: 'absolute'
        };
    }
}
