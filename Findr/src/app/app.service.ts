import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    friends = [];
    storedUserID;

    constructor(private http: HttpClient) {
    }

    signUp(username: string, password: string, email: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('email', email);
        return this.http.post('http://localhost:8001/user/login/signup', params);
    }

    changePassword(newPass: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', this.storedUserID)
            .set('newPass', newPass);
        return this.http.put('http://localhost:8001/user/profile/password', params);
    }

    changeUsername(newName: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', this.storedUserID)
            .set('newName', newName);
        return this.http.put('http://localhost:8001/user/profile/username', params);
    }

    changeProfilePicture(newPic): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', this.storedUserID)
            .set("newPic", encodeURIComponent(newPic));
        return this.http.put('http://localhost:8001/user/profile/picture', params);
    }

    getProfile(): Observable<any> {
        return this.http.get('http://localhost:8001/user/profile/' + this.storedUserID);
    }

    getFriends(): Observable<any> {
        return this.http.get('http://localhost:8001/user/friends/' + this.storedUserID);
    }

    getFriendRequests(): Observable<any> {
        return this.http.get('http://localhost:8001/user/friends/friend-requests/' + this.storedUserID);
    }

    getBlockedUsers(): Observable<any> {
        return this.http.get('http://localhost:8001/user/friends/blocked/' + this.storedUserID);
    }

    sendFriendRequest(receiver: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userOne', this.storedUserID)
            .set('userTwo', receiver);
        return this.http.post('http://localhost:8001/api/sendfriendrequest', params);
    }

    acceptFriendRequest(senderID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('accepterID', this.storedUserID)
            .set('senderID', senderID);
        return this.http.post('http://localhost:8001/user/friend-requests/accept', params);
    }

    deleteFriendRequest(senderID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('accepterID', this.storedUserID)
            .set('senderID', senderID);
        return this.http.post('http://localhost:8001/user/friends/friend-requests/remove', params);
    }

    deleteFriend(senderID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userOne', this.storedUserID)
            .set('userTwo', senderID);
        return this.http.post('http://localhost:8001/user/friends/delete', params);
    }

    blockFriend(senderID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userOne', this.storedUserID)
            .set('userTwo', senderID);
        return this.http.post('http://localhost:8001/user/friends/block', params);
    }

    unblockUser(senderID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userOne', this.storedUserID)
            .set('userTwo', senderID);
        return this.http.post('http://localhost:8001/user/friends/blocked/unblock', params);
    }
}
