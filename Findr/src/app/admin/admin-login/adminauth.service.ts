import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AdminauthService {
    refreshTokenInterval;
    storage = sessionStorage;

    constructor(private http: HttpClient) {
    }

    userIsLoggedIn(): string {
        return this.getJWTToken();
    }

    setRefreshInterval(): void {
        if (!this.userIsLoggedIn()) return;

        this.refreshTokenInterval = setInterval(() => {
            this.refreshInterval();
        }, 10000);
    }

    refreshInterval(): void {
        this.refreshToken().subscribe(res => {
            this.writeTokens(res);
        });
    }

    login(username: string, password: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('username', username)
            .set('password', password);
        return this.http.post('http://localhost:8001/api/admin/login/', params);
    }

    refreshToken(): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('token', this.getRefreshToken());

        return this.http.post('http://localhost:8001/api/admin/token/refresh', params);
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
        localStorage.removeItem('userID');
        localStorage.removeItem('rememberme');
    }

    logout(): void {
        this.eraseTokens();
        clearInterval(this.refreshTokenInterval);
    }

}
