import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdmindataService {
    itemDeleted: Subject<string> = new Subject<string>();
    undoItemDeleted: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {
    }

    deleteItemListener(): Observable<any> {
        return this.itemDeleted.asObservable();
    }

    undoDeleteItemListener(): Observable<any> {
        return this.undoItemDeleted.asObservable();
    }

    deleteItem(item): void {
        console.log(item);
        this.itemDeleted.next(item);
    }

    undoDeleteItem(): void {
        this.undoItemDeleted.next();
    }

    getUsers(): Observable<any> {
        return this.http.get('http://localhost:8001/api/users');
    }

    getGames(): Observable<any> {
        return this.http.get('http://localhost:8001/api/games');
    }

    addGame(name: string, description: string, category: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('name', name).set('category', category).set('description', description);

        return this.http.post('http://localhost:8001/api/games/', params);
    }

    deleteGame(name: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('name', name);
        return this.http.delete('http://localhost:8001/api/games/' + name);
    }

    deleteReportedUser(id: number): Observable<any> {
        console.log("pp");
        return this.http.delete('http://localhost:8001/api/users/reported/' + id);
    }

    getReportedUsers(): Observable<any> {
        return this.http.get('http://localhost:8001/api/users/reported');
    }

    getSupportTickets(): Observable<any> {
        return this.http.get('http://localhost:8001/api/support/tickets');
    }

    deleteSupportTicket(id: number): Observable<any> {
        return this.http.delete('http://localhost:8001/api/support/tickets/' + id);
    }

}
