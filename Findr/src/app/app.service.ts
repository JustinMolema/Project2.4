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
        let params: HttpParams = new HttpParams();
        params = params.set('username', username);
        params = params.set('password', password);
        params = params.set('email', email);

        return this.http.post('http://localhost:8001/api/login/signup', params);
    }

    changePassword(userID: string, newPass: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('userID', userID);
        params = params.set('newPass', newPass)
        return this.http.put('http://localhost:8001/api/passwordchange', params);
    }

    changeUsername(userID: string, newName: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('userID', userID);
        params = params.set('newName', newName);
        return this.http.put('http://localhost:8001/api/usernamechange', params);
    }

    getBlob(file){
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Ocp-Apim-Subscription-Key': 'change this'
        });

        return this.http.post<Blob>(file,
            {
                "url": file.getSrc()
            }, {headers: headers, responseType: 'blob' as 'json' });
    }


    changeProfilePicture(userID: string, newPic): Observable<any>{
        let params: HttpParams = new HttpParams();
        params = params.set('userID', userID);
        params = params.set('newPic', newPic)
        return this.http.put('http://localhost:8001/api/profilepicchange', params);
    }

    getProfile(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('userID', userID);

        return this.http.post('http://localhost:8001/api/profile', params);
    }

    getFriends(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('userID', userID);
        return this.http.post('http://localhost:8001/api/getFriends', params);
    }

    getFriendRequests(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('userID', userID);
        return this.http.post('http://localhost:8001/api/getFriendRequests', params);
    }

    getBlockedUsers(userID: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('userID', userID);
        return this.http.post('http://localhost:8001/api/getBlockedUsers', params);
    }

    acceptFriendRequest(senderID: string): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.set('accepterID', this.storedUserID);
        params = params.set('senderID', senderID);
        return this.http.post('http://localhost:8001/api/acceptFriendRequest', params);
    }
}
