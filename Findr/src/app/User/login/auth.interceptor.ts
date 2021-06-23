import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const idToken = this.authService.getJWTToken();
        if (!idToken) {
            return next.handle(request);
        }
        const cloned = this.requestCloneWithHeader(request, idToken);

        return next.handle(cloned);
    }

    requestCloneWithHeader(request: HttpRequest<unknown>, idToken: string): HttpRequest<unknown> {
        return request.clone({
            headers: request.headers.set('Authorization',
                'Bearer ' + idToken)
        });
    }
}
