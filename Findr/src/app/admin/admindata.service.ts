import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class AdmindataService {
    itemDeleted: Subject<string> = new Subject<string>();
    undoItemDeleted: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient, public snackBar: MatSnackBar) {
    }

    openSnackbar(message: string, action?: string): MatSnackBarRef<any> {
        return this.snackBar.open(message, action);
    }

    deleteItemListener(): Observable<any> {
        return this.itemDeleted.asObservable();
    }

    undoDeleteItemListener(): Observable<any> {
        return this.undoItemDeleted.asObservable();
    }

    deleteItem(item): void {
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

    addGame(name: string, description: string, category: string, image: any): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('name', name).set('category', category).set('description', description)
            .set('image', encodeURIComponent(image));

        return this.http.post('http://localhost:8001/api/games/', params);
    }

    editGame(name: string, description: string, category: string, image: any, newname: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('name', name)
            .set('category', category)
            .set('description', description)
            .set('newname', newname)
            .set('image', encodeURIComponent(image));

        return this.http.put('http://localhost:8001/api/games/', params);
    }

    deleteGame(name: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/games/' + name);
    }

    deleteReportedUser(id: number): Observable<any> {
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

    warnUser(id: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('userID', id);
        return this.http.put('http://localhost:8001/api/users/warn/', params);
    }

    banUser(id: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('userID', id);
        return this.http.put('http://localhost:8001/api/users/ban/', params);
    }

    unbanUser(id: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('userID', id);
        return this.http.put('http://localhost:8001/api/users/unban/', params);
    }



}
