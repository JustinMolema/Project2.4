import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {

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

    changePassword(userID: string, newPass: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', userID)
            .set('newPass', newPass)
        return this.http.put('http://localhost:8001/user/profile/password', params);
    }

    changeUsername(userID: string, newName: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', userID)
            .set('newName', newName);
        return this.http.put('http://localhost:8001/user/profile/username', params);
    }

    changeProfilePicture(userID: string, newPic): Observable<any>{
        let params: HttpParams = new HttpParams()
            .set('userID', userID)
            .set("newPic", encodeURIComponent(newPic));
        return this.http.put('http://localhost:8001/user/profile/picture', params);
    }

    getProfile(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', userID);

        return this.http.post('http://localhost:8001/user/profile', params);
    }

    getFriends(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', userID);
        return this.http.post('http://localhost:8001/user/friends', params);
    }

    getFriendRequests(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', userID);
        return this.http.post('http://localhost:8001/user/friends/friend-requests', params);
    }

    getBlockedUsers(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams()
            .set('userID', userID);
        return this.http.post('http://localhost:8001/user/friends/blocked', params);
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
}
