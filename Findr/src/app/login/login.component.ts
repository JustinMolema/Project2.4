import { Component, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;
    accounts = [{naam: "PeterJanmetdehondindepan", wachtwoord: "johnpakthemindekont"}];
    constructor() { }

    ngOnInit(): void { }

    login() {
        if (this.username == this.accounts[0].naam && this.password == this.accounts[0].wachtwoord){
            console.log("You are now logged in");
            console.log(this.accounts[0].naam + " " + this.accounts[0].wachtwoord);
        } else {
            console.log("Error, no username")
        }
    }

}
