import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  form: FormGroup;

//   accounts = [{naam: "PeterJanmetdehondindepan", wachtwoord: "johnpakthemindekont"}];

  constructor(private fb: FormBuilder,
              private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: [true]
    });
  }

  ngOnInit(): void {
  }

  login() {
    const val = this.form.value;

    if (val.email == "test" && val.password == "test") {
      if (val.email && val.password) {
        if (val.rememberme == false) {
          this.authService.login(val.email, val.password).subscribe(res => {
            sessionStorage.setItem('jwt', res["accessToken"]);
            sessionStorage.setItem('refreshToken', res["refreshToken"]);
            this.router.navigate(["/games"]);
            this.authService.localstorage = false;
            console.log(res)
          });
        } else {
          this.authService.login(val.email, val.password).subscribe(res => {
            localStorage.setItem('jwt', res["accessToken"]);
            localStorage.setItem('refreshToken', res["refreshToken"]);
            this.router.navigate(["/games"]);
            console.log(res)
          });
        }

      }
    } else {
      console.log("WRONG!");
    }
  }
}
