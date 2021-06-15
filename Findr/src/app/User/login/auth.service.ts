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

    login(username: string, password: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('username', username)
            .set('password', password);
        return this.http.post('http://localhost:8001/api/user/login/', params);
    }

    refreshToken(): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('token', this.getRefreshToken());

        return this.http.post('http://localhost:8001/api/token/', params);
    }

    writeTokens(tokens): void {
        this.retrieveStorageType();
        this.storage.setItem('jwt', tokens.accessToken);
        if (tokens.refreshToken) this.storage.setItem('refreshToken', tokens.refreshToken);
    }

    getJWTToken(): string {
        this.retrieveStorageType();
        return this.storage.getItem('jwt');
    }

    getRefreshToken(): string {
        this.retrieveStorageType();
        return this.storage.getItem('refreshToken');
    }

    eraseTokens(): void {
        this.retrieveStorageType();
        this.storage.removeItem('jwt');
        this.storage.removeItem('refreshToken');
        localStorage.removeItem('userID');
        localStorage.removeItem('rememberme')
    }

    retrieveStorageType() {
        if (localStorage.getItem('rememberme') == 'true') {
            this.storage = localStorage;
        } else{
            this.storage = sessionStorage
        }
    }

    logout(): void {
        this.eraseTokens();
        this.chat.closeSocket();
        clearInterval(this.refreshTokenInterval);
    }
}
