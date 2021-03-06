import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {AdmindataService} from "./admin/admindata.service";
import {globalFindrMethods} from "./sharedmodule/global.findr.methods";
import {SafeResourceUrl} from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    user;
    picture;
    friends = [];
    games = [];
    favoriteGames = new Map<string, {
        name: string;
        image: SafeResourceUrl
    }>();
    friendRequests = [];
    blockedUsers = [];

    canLoadListener;
    APILoaded = new Subject<any>();

    constructor(private http: HttpClient, private adminData: AdmindataService,
                private findrMethods: globalFindrMethods) {
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

    getFavoriteGames(): Observable<any> {
        return this.http.get('http://localhost:8001/api/games/favorite/' + localStorage.getItem('userID'));
    }

    setFavorite(game: string): Observable<any> {
        const params: HttpParams = new HttpParams().set("id", localStorage.getItem('userID')).set("game", game);
        return this.http.post('http://localhost:8001/api/games/favorite', params);
    }

    deleteFavorite(game: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/games/favorite/' + localStorage.getItem('userID') + '/' + game);
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
        return this.http.get('http://localhost:8001/api/user/' + this.user.Username + '/friends');
    }

    getFriendRequests(): Observable<any> {
        return this.http.get('http://localhost:8001/api/user/' + this.user.Username + '/friend-requests');
    }

    getBlockedUsers(): Observable<any> {
        return this.http.get('http://localhost:8001/api/user/' + this.user.Username + '/blocked');
    }

    sendFriendRequest(receiver: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.post('http://localhost:8001/api/user/' + this.user.Username + '/friend-requests/' + receiver, params);
    }

    acceptFriendRequest(senderID: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.put('http://localhost:8001/api/user/' + this.user.Username + '/friend-requests/' + senderID, params);
    }

    deleteFriendRequest(senderID: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/user/' + this.user.Username + '/friend-requests/' + senderID);
    }

    deleteFriend(senderID: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/user/' + this.user.Username + '/friends/' + senderID);
    }

    blockFriend(senderID: string): Observable<any> {
        const params: HttpParams = new HttpParams();
        return this.http.post('http://localhost:8001/api/user/' + this.user.Username + '/blocked/' + senderID, params);
    }

    unblockUser(senderID: string): Observable<any> {
        return this.http.delete('http://localhost:8001/api/user/' + this.user.Username + '/blocked/' + senderID);
    }

    canLoad(): Observable<any> {
        return this.APILoaded.asObservable();
    }

    isFriend(user): boolean {
        for (const friend of this.friends) {
            if (friend.User_ID === user.userID) return true;
        }
        return false;
    }

    applicationInitialAPICalls(): void {
        this.getProfileFromServer();
        this.getFavoriteGamesFromServer();
        this.canLoadListener = this.canLoad().subscribe(res => {
            this.getFriendsFromServer();
            this.getFriendRequestsFromServer();
            this.getBlockedUsersFromServer();
            this.canLoadListener.unsubscribe();
        });
    }

    getFavoriteGamesFromServer(): void {
        this.favoriteGames.clear();

        this.getFavoriteGames().subscribe(res => {
            if (res.length > 0) {
                res.forEach(element => {
                    this.favoriteGames.set(element.Game, {image: "", name: element.Game});

                });
            }
            this.getGamesFromServer();
        });
    }

    getGamesFromServer(): void {
        this.games = [];

        this.adminData.getGames().subscribe(res => {
            if (res.length > 0) {
                res.forEach(element => {
                    element.Image = this.findrMethods.sanitize(decodeURIComponent(element.Image));
                    this.games.push(element);
                    if (this.favoriteGames.has(element.Name))
                        this.favoriteGames.get(element.Name).image = element.Image;
                });
            }
        });
    }

    getProfileFromServer(): void {
        this.getProfile().subscribe(res => {
            this.user = res[0];
            this.APILoaded.next(true);
        });
    }

    getFriendsFromServer(): void {
        this.friends = [];
        this.getFriends().subscribe(friendsFromServer => {
            this.setFriendInfo(friendsFromServer, this.friends);
        });
    }

    getFriendRequestsFromServer(): void {
        this.friendRequests = [];
        this.getFriendRequests().subscribe(friendRequestsFromServer => {
            this.setFriendInfo(friendRequestsFromServer[0], this.friendRequests);
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

    createSupportTicket(category: string, description: string): Observable<any> {
        const params: HttpParams = new HttpParams()
            .set('category', category)
            .set('description', description);
        return this.http.post('http://localhost:8001/api/support/tickets', params);
    }
}
