import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    friends = [];

    constructor(private http: HttpClient) {
    }

    signUp(username: string, password: string, email: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('email', email);

        console.log(email);
        return this.http.post('http://localhost:8001/api/user/signup', params);
    }

    changePassword(newPass: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('newPass', newPass);
        return this.http.put('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/password', params);
    }

    changeUsername(newName: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('newName', newName);
        return this.http.put('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/username', params);
    }

    changeProfilePicture(newPic): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set("newPic", encodeURIComponent(newPic));
        return this.http.put('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/picture', params);
    }

    getProfile(): Observable<any> {
        return this.http.get('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/profile');
    }

    getFriends(): Observable<any> {
        return this.http.get('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/friends');
    }

    getFriendRequests(): Observable<any> {
        return this.http.get('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/friend-requests');
    }

    getBlockedUsers(): Observable<any> {
        return this.http.get('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/blocked');
    }

    sendFriendRequest(receiver: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.post('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/friend-requests/' + receiver, params);
    }

    acceptFriendRequest(senderID: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.put('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/friend-requests/' + senderID, params);
    }

    deleteFriendRequest(senderID: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/friend-requests/' + senderID);
    }

    deleteFriend(senderID: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/friends/' + senderID);
    }

    blockFriend(senderID: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.post('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/blocked/' + senderID, params);
    }

    unblockUser(senderID: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/user/' + localStorage.getItem('userID') + '/blocked/' + senderID);
    }
}
