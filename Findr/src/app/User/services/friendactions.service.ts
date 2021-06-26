import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FriendactionsService {

    constructor(private http: HttpClient) {
    }

    sendFriendRequest(receiver: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.post('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/friend-requests/' + receiver, params);
    }

    reportUser(message: any): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('userID', message.userID)
            .set('username', "admin")
            .set('date', message.datetime)
            .set('reason', "Harassment")
            .set('message', message.message);
        return this.http.post('http://localhost:8001/api/users/reported', params);
    }

    blockUser(senderID: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.post('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/block/' + senderID, params);
    }
}
