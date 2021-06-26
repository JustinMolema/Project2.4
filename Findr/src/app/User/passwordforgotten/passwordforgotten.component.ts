import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "../../app.service";
import {sha512} from "js-sha512";
import {globalFindrMethods} from '../../sharedmodule/global.findr.methods'

@Component({
    selector: 'app-passwordforgotten',
    templateUrl: './passwordforgotten.component.html',
    styleUrls: ['./passwordforgotten.component.css']
})
export class PasswordforgottenComponent implements OnInit {

    form: FormGroup;

    constructor(private fb: FormBuilder, private appService: AppService, private findrMethods: globalFindrMethods) {
        this.form = this.fb.group({
            password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
            confirm: ['', Validators.required]
        }, {
            validator: this.findrMethods.mustMatch('password', 'confirm')
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const val = this.form.value;
        const hash = sha512.create();
        hash.update(val.password);
        const encryptedpassword = hash.hex();
        this.appService.changePassword(encryptedpassword).subscribe();
    }

}
