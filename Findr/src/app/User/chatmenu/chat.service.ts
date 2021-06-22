import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable} from 'rxjs';
import {AppService} from '../../app.service';

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
    constructor(private appService: AppService) {
    }

    openSocket(): void {
        this.socket.auth = {username: 'Meloen', sessionID: Number(localStorage.getItem('userID'))};

        this.socket.connect();
        this.createSession();
        this.getAllOnlineFriends();
        this.friendLoggedIn().subscribe(res => {
            console.log(res);
        });
        this.receivePrivateMessageListener();
        this.connect();
        this.disconnect();
        this.friendLoggedOut().subscribe(res => {
            console.log(res);
        });
    }

    createSession(): void {
        this.socket.on('session', ({sessionID}) => {
            this.socket.auth = {sessionID};
        });
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
                    this.privateMessages.push({userID: element.User_ID, messages: []});
                });
            }

        });
    }

    clearChatListeners(): void {
        // this.socket.off('private message');
        // this.socket.off('new message');
        // this.socket.off('user connected');
        // this.socket.off('user disconnected');
    }

    connect(): void {
        this.socket.on('connect', () => {
            this.onlineFriends.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
        });
    }

    disconnect(): void {
        this.socket.on('disconnect', () => {
            this.onlineFriends.forEach((user) => {
                if (user.self) {
                    user.connected = false;
                }
            });
        });
    }

    getAllOnlineFriends(): void {
        this.socket.on('users', (users) => {
            users.forEach((user) => {
                user.self = user.userID === this.socket.id;
                this.initReactiveProperties(user);
            });
            this.onlineFriends = users.sort((a, b) => {
                if (a.self) {
                    return -1;
                }
                if (b.self) {
                    return 1;
                }
                if (a.username < b.username) {
                    return -1;
                }
                return a.username > b.username ? 1 : 0;
            });
        });
    }

    initReactiveProperties(user): void {
        user.connected = true;
        user.messages = [];
        user.hasNewMessages = false;
    }

    friendLoggedIn(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('user connected', (user) => {
                this.initReactiveProperties(user);
                this.onlineFriends.push(user);
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
            for (const message of this.privateMessages) {
                if (message.userID === res.userID) {
                    message.messages.push({ userID: res.userID, datetime: Date.now(),
                        username: res.user, message: res.message, received: true});
                }

            }
            this.cdRef.detectChanges();

        });
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
