import { Component, Input, OnInit, ErrorHandler } from '@angular/core';
import { RouterModule, Router } from "@angular/router";
import { WrongPasswordHandler } from './wrongpasswordhandler';

@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
    username: String = '';
    password: String = '';
    authorized: boolean;
    constructor(private router: Router) {

    }

    ngOnInit(): void {
        this.authorized = true;
    }

    checkUserNamePassword() {
        if (this.username == "admin" && this.password == "admin") {
            this.router.navigate(['admin/home'])
        }
        else {
            throw new WrongPasswordHandler();
        }
    }
}
