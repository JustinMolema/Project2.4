import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ChatService} from '../chatmenu/chat.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    refreshTokenInterval;
    storage = localStorage;

    constructor(private http: HttpClient, private router: Router, private chat: ChatService) {
    }

    userIsLoggedIn(): string {
        return this.getJWTToken();
    }

    setRefreshInterval(): void {
        if (!this.userIsLoggedIn()) return;

        this.refreshTokenInterval = setInterval(() => {
            this.refreshInterval();
        }, 1000);
    }

    refreshInterval(): void {
        this.refreshToken().subscribe(res => {
            this.writeTokens(res);
        });
    }

    login(email: string, password: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('username', email);
        params = params.set('password', password);
        this.refreshTokenInterval = true;

        return this.http.post('http://localhost:8001/api/login/', params);
    }

    refreshToken(): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('token', this.getRefreshToken());

        return this.http.post('http://localhost:8001/api/token/', params);
    }

    writeTokens(tokens): void {
        this.storage.setItem('jwt', tokens.accessToken);
        if (tokens.refreshToken) this.storage.setItem('refreshToken', tokens.refreshToken);
    }

    getJWTToken(): string {
        return this.storage.getItem('jwt');
    }

    getRefreshToken(): string {
        return this.storage.getItem('refreshToken');
    }

    eraseTokens(): void {
        this.storage.removeItem('jwt');
        this.storage.removeItem('refreshToken');
    }

    logout(): void {
        this.eraseTokens();
        this.chat.closeSocket();
        clearInterval(this.refreshTokenInterval);
    }
}
