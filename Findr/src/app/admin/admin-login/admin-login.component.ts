import { Component, Input, OnInit, ErrorHandler } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { WrongPasswordHandler } from './wrongpasswordhandler';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {sha512} from 'js-sha512';
import {AdminauthService} from "./adminauth.service";


@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
    username = '';
    password = '';
    authorized: boolean;
    form: FormGroup;


    constructor(private router: Router, private fb: FormBuilder, private adminauth: AdminauthService) {
        this.createForm();
    }

    createForm(): void{
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.authorized = true;
    }

    checkUserNamePassword(): void {
        if (this.username === "admin" && this.password === "admin") {
            this.router.navigate(['admin/reportedusers']);
        }
        else {
            throw new WrongPasswordHandler();
        }
    }

    login(): void {
        const val = this.form.value;
        this.loginToServer(val);
    }

    loginToServer(val: any): void{
        const hash = sha512.create();
        hash.update(val.password);
        const encryptedpassword = hash.hex();

        this.adminauth.login(val.username, encryptedpassword).subscribe(res => {
            if (res.status === 200) {
                localStorage.setItem('userID', res.userID);
                localStorage.setItem('rememberme', val.rememberme);
                this.setJWT(res);
                this.router.navigate(['/admin/games']);
                this.adminauth.setRefreshInterval();
            } else if (res.status === 403) {
                // TODO give user proper feedback
                console.log("error");
            }
        });
    }

    setJWT(response): void {
        this.adminauth.storage = sessionStorage;
        this.adminauth.writeTokens(response);
    }

}
