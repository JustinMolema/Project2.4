import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string) {

    return this.http.post<any>('http://localhost:5000/api/login', {name: email, password}).pipe(
      tap(res => localStorage.setItem('jwt', res.token)));
                         
    // this is just the HTTP call,
    // we still need to handle the reception of the token
    // .shareReplay();
  }

  testding(email: string, password: string)
  {
    return this.http.get<any>('http://localhost:5000/api')
  } 

  logout(): void{
    localStorage.removeItem('jwt');
    // localStorage.removeItem('expires_at');
  }

  secret(){
    return this.http.get<any>('http://localhost:5000/api/secret');
  }
}
