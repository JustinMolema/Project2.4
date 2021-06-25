import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AdmindataService} from "./admin/admindata.service";
import {globalFindrMethods} from "./sharedmodule/global.findr.methods";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    user;
    picture;
    friends = [];
    games = [];
    friendRequests = [];
    blockedUsers = [];

    APILoaded = new Subject<any>();
    constructor(private http: HttpClient, private sanitiser: DomSanitizer,
                private adminData: AdmindataService, private findrMethods: globalFindrMethods) {
    }

    signUp(username: string, password: string, email: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('email', email);

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

    canLoad(): Observable<any> {
        return this.APILoaded.asObservable();
    }

    applicationInitialAPICalls(): void {
        this.getProfileFromServer();
        this.getFriendsFromServer();
        this.getFriendRequestsFromServer();
        this.getBlockedUsersFromServer();
        this.getGamesFromServer();
    }

    getGamesFromServer(): void {
        this.games = [];

        this.adminData.getGames().subscribe(res => {
            if (res.length > 0) {
                res.forEach(element => {
                    element.Image = this.findrMethods.sanitize(decodeURIComponent(element.Image));
                    this.games.push(element);
                });
            }
        });

    }
    getProfileFromServer(): void {
        this.getProfile().subscribe(res => {
            this.user = res[0];
            this.APILoaded.next(true);
            console.log("1");
        });
    }

    getFriendsFromServer(): void {
        this.friends = [];
        this.getFriends().subscribe(friendsFromServer => {
            this.setFriendInfo(friendsFromServer, this.friends);
            console.log("2");
        });
    }

    getFriendRequestsFromServer(): void {
        this.friendRequests = [];
        this.getFriendRequests().subscribe(friendRequestsFromServer => {
            this.setFriendInfo(friendRequestsFromServer[0], this.friendRequests);
            console.log("3");
        });
    }

    getBlockedUsersFromServer(): void {
        this.blockedUsers = [];
        this.getBlockedUsers().subscribe(blockedUsersFromServer => {
            this.setFriendInfo(blockedUsersFromServer[0], this.blockedUsers);
        });
    }

    setFriendInfo(from, to): void {
        if (from.length > 0) {
            from.forEach(element => {
                if (element.Profile_picture) {
                    element.Profile_picture = this.findrMethods.sanitize(decodeURIComponent(element.Profile_picture));
                }
                to.push(element);
            });
        }
    }
}
