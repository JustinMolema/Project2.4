import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  refreshTokenInterval: boolean = false;
  localstorage: boolean = true;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.set("username", email);
    this.refreshTokenInterval = true;

    return this.http.post("http://localhost:8001/api/login/", params);
    // return this.http.post<any>('http://localhost:5000/api/login', {name: email, password}).pipe(
    //   tap(res => localStorage.setItem('jwt', res.token)));

    // this is just the HTTP call,
    // we still need to handle the reception of the token
    // .shareReplay();
  }

  refreshToken() {
    // if(!localStorage.getItem('refreshToken') || !localStorage.getItem('jwt'))
    // {
    //   this.router.navigate(['/login']);
    //   this.logout();
    //   alert("Session Expired");
    //   return null;
    // }
    let params: HttpParams = new HttpParams();
    if (this.localstorage){
      params = params.set("token", localStorage.getItem('refreshToken'));
    } else {
      params = params.set("token", sessionStorage.getItem('refreshToken'));
    }


    /*this.updateRememberMe().subscribe(res => {
      console.log("updated that shit");
    });*/

    return this.http.post("http://localhost:8001/api/token/", params);
  }

  updateRememberMe(rememberme: boolean)
  {
    let params: HttpParams = new HttpParams();
    params = params.set("remember", rememberme.toString());
    //console.log("????? WORK FOR THE LOVE OF GOD PLEASE BLIZZARD FIX YOUR SHIT");
    return this.http.post("http://localhost:8001/api/remember/", params);
  }

  updateRemMe(rememberme: boolean){
    this.localstorage = rememberme;
  }

  logout(): void{
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('refreshToken');
    this.refreshTokenInterval = false;
  }

  secret()
  {
    return this.http.get<any>('http://localhost:5000/api/secret');
  }
}
