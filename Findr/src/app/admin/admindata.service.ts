import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdmindataService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get('http://localhost:8001/api/users');
    }

    getGames(): Observable<any> {
        return this.http.get('http://localhost:8001/api/games');
    }

    addGame(name: string, description: string, category: string): Observable<any> {
        console.log('data');
        let params: HttpParams = new HttpParams();
        params = params.set('name', name).
            set('category', category).
            set('description', description);

        return this.http.post('http://localhost:8001/api/game/', params);
    }

    deleteGame(name: string): Observable<any> {
        console.log(name);
        let params: HttpParams = new HttpParams();
        params = params.set('name', name);
        return this.http.delete('http://localhost:8001/api/game/' + name);
    }

    getSupportTickets(): Observable<any> {
        return this.http.get('http://localhost:8001/api/supporttickets');
    }

}
