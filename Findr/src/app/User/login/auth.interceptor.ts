import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  idToken;

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.localstorage) {
      this.idToken = localStorage.getItem('jwt');
    } else {
      this.idToken = sessionStorage.getItem('jwt');
    }

    console.log("INTERCEPT");

    if (this.idToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization',
          'Bearer ' + this.idToken)
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
