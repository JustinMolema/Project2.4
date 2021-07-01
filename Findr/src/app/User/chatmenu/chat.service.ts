import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable} from 'rxjs';
import {AppService} from '../../app.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket = io('http://localhost:8081', {autoConnect: false});
    private = false;
    privateMessages = [];
    receiverID;
    private cdRef;
    public onlineFriends = [];
    friends = [];

    setRef(ref): void {
        this.cdRef = ref;
    }

    constructor(private appService: AppService, private sanitizer: DomSanitizer) {
    }

    openSocket(): void {
        this.socket.auth = {sessionID: Number(localStorage.getItem('userID'))};

        this.socket.connect();
        this.getAllFriends();
        this.friendLoggedIn().subscribe();
        this.receivePrivateMessageListener();
        this.friendLoggedOut().subscribe();
    }

    closeSocket(): void {
        this.socket.disconnect();
        this.socket.off('connect');
        this.socket.off('session');
        this.socket.off('disconnect');
        this.socket.off('users');
        this.socket.off('user connected');
        this.socket.off('user disconnected');
        this.socket.off('private message');
        this.socket.off('new message');
    }

    getAllFriends(): void {
        this.friends = [];
        this.appService.getFriends().subscribe(friendsFromServer => {
            if (friendsFromServer.length > 0){
                friendsFromServer.forEach(element => {
                    this.friends.push(element);
                    this.privateMessages.push({userID: element.User_ID, username: element.Username, messages: []});
                });
            }
            this.getAllOnlineFriends();

        });
    }

    getAllOnlineFriends(): void {
        this.socket.on('users', (users) => {
            users.forEach(element => {
                this.friends.forEach(friend => {
                    if (friend.User_ID === element) {
                        this.onlineFriends.push(element);
                    }
                });
            });
        });
    }

    friendLoggedIn(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('user connected', (user) => {
                if (!this.onlineFriends.includes(user) && this.appService.isFriend(user)) {
                    this.onlineFriends.push(user);
                }
                observer.next(user);
            });
        });
    }

    friendLoggedOut(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('user disconnected', (user) => {
                observer.next(user);
                this.onlineFriends = this.onlineFriends.filter(item => item.userID !== user.userID);
            });
        });
    }

    /****************************** PUBLIC CHAT********************************************/

    joinGameRoom(data): void {
        this.socket.emit('join', data);
        this.getAllOnlineFriends();
        this.friendLoggedIn();
    }

    leaveGameRoom(data): void {
        this.socket.emit('leave', data);
    }

    sendMessageToGameChat(data): void {
        this.socket.emit('message', data);
    }

    newMessageReceivedFromGameChat(): Observable<any> {
        return new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }

    /****************************** PRIVATE CHAT********************************************/

    receivePrivateMessageListener(): void {
        this.receivedPrivateMessage().subscribe(res => {
            console.log(this.privateMessages);
            console.log(res.userID);
            for (const message of this.privateMessages) {
                if (message.userID === res.userID) {
                    message.messages.push({ userID: res.userID, datetime: Date.now(),
                        username: res.user,
                        message: res.message,
                        profilePicture: this.sanitize(decodeURIComponent(res.profilePicture)),
                        received: true});
                }
            }
            if (this.cdRef)
                this.cdRef.detectChanges();
        });
    }

    sanitize(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    sendPrivateMessage(data): void {
        this.socket.emit('private message', data);
    }

    receivedPrivateMessage(): Observable<any> {
        return new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('private message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }
}
