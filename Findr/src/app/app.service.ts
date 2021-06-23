import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {NavbarService} from "./User/navbar/navbar.service";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    user;
    picture;
    friends = [];
    friendRequests = [];
    blockedUsers = [];

    APILoaded = new Subject<any>();
    constructor(private http: HttpClient, private sanitiser: DomSanitizer, private navbarService: NavbarService) {
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
        console.log("TRUE");
    }

    getProfileFromServer(): void {
        this.getProfile().subscribe(res => {
            this.user = res[0];
            this.APILoaded.next(true);

            // this.email = decodeURIComponent(res[0].Email);
            // this.warningCount = res[0].Warnings;
            // if (res[0].Profile_picture) {
            //     this.dbPicture = this.sanitize(decodeURIComponent(res[0].Profile_picture));
            //     this.hasFileBeenSelected = true;
            // }
        });
    }

    getFriendsFromServer(): void {
        this.friends = [];
        this.getFriends().subscribe(friendsFromServer => {
            if (friendsFromServer.length > 0) {
                friendsFromServer.forEach(element => {
                    if (element.Profile_picture) {
                        element.Profile_picture = this.sanitize(decodeURIComponent(element.Profile_picture));
                    }
                    this.friends.push(element);
                });
            }
            // this.navbarService.callComponentMethod();
        });
    }

    getFriendRequestsFromServer(): void {
        this.friendRequests = [];
        this.getFriendRequests().subscribe(friendRequestsFromServer => {
            if (friendRequestsFromServer[0].length > 0) {
                friendRequestsFromServer[0].forEach(element => {
                    if (element.Profile_picture) {
                        element.Profile_picture = this.sanitize(decodeURIComponent(element.Profile_picture));
                    }
                    this.friendRequests.push(element);
                });
            }
        });
    }

    getBlockedUsersFromServer(): void {

        this.blockedUsers = [];
        this.getBlockedUsers().subscribe(blockedUsersFromServer => {
            if (blockedUsersFromServer[0].length > 0) {
                blockedUsersFromServer[0].forEach(element => {
                    if (element.Profile_picture) {
                        element.Profile_picture = this.sanitize(decodeURIComponent(element.Profile_picture));
                    }
                    this.blockedUsers.push(element);
                });
            }

        });
    }

    sanitize(url: string): SafeResourceUrl {
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }

}
