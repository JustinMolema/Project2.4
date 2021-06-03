import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  signUp(username: string, password: string, email: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.set('username', username);
    params = params.set('password', password);
    params = params.set('email', email);
    return this.http.post('http://localhost:8001/api/login/signup', params);
  }
}
