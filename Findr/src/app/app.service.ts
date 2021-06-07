import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  storedUserID;
 
  constructor(private http: HttpClient) { }

  signUp(username: string, password: string, email: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.set('username', username);
    params = params.set('password', password);
    params = params.set('email', email);

    return this.http.post('http://localhost:8001/api/login/signup', params);
  }

  getProfile(userID: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.set('userID', userID);

    return this.http.post('http://localhost:8001/api/profile', params);
  }

  getFriends(userID: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.set('userID', userID);
    return this.http.post('http://localhost:8001/api/getFriends', params);
  }

  getFriendRequests(userID: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.set('userID', userID);
    return this.http.post('http://localhost:8001/api/getFriendRequests', params);
  }

  getBlockedUsers(userID: string): Observable<any>{
    let params: HttpParams = new HttpParams();
    params = params.set('userID', userID);
    return this.http.post('http://localhost:8001/api/getBlockedUsers', params);
  }
}
