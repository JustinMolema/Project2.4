import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../../app.service";
import {sha512} from "js-sha512";
import {mustMatch} from '../../custom.validators'

@Component({
    selector: 'app-passwordforgotten',
    templateUrl: './passwordforgotten.component.html',
    styleUrls: ['./passwordforgotten.component.css']
})
export class PasswordforgottenComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder, private appService: AppService) {
        this.form = this.fb.group({
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            confirm: ['', Validators.required]
        }, {
            validator: mustMatch('password', 'confirm')
        })
    }

    ngOnInit(): void {
    }

    onSubmit() {
        const val = this.form.value;
        const hash = sha512.create();
        hash.update(val.password);
        const encryptedpassword = hash.hex();
        this.appService.changePassword(encryptedpassword).subscribe(res => {
            console.log("Password changed")
        })
    }

}
