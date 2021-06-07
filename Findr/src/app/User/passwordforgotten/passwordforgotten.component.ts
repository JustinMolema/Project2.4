import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passwordforgotten',
  templateUrl: './passwordforgotten.component.html',
  styleUrls: ['./passwordforgotten.component.css']
})
export class PasswordforgottenComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password:['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirm:['', Validators.required]
    },{
      validator: this.mustMatch('password', 'confirm-password')
  })
  }

  ngOnInit(): void {
  }

  // TODO extract this method here and in signup component
  mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
    };
}
}
