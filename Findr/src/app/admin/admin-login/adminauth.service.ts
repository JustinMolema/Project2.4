import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AdminauthService {
    storage = sessionStorage;

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('username', username)
            .set('password', password);
        return this.http.post('http://localhost:8001/api/admin/login/', params);
    }

    writeTokens(tokens): void {
        this.storage.setItem('admin-jwt', tokens.accessToken);
    }

    getJWTToken(): string {
        return this.storage.getItem('admin-jwt');
    }

    logout(): void {
        this.storage.removeItem('admin-jwt');
    }
}
