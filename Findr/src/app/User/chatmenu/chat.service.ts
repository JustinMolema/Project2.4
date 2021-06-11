import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket = io('http://localhost:8081', {autoConnect: false});
    private users = [];
    private = false;
    privateMessages = [{id: "7208", messages: []}, {id: "7211", messages: []}, {id: "7209", messages: []}];
    to;

    constructor() {
    }

    // TODO create json with array so all messages can be put and retrieved from certain users depending on the view.

    openSocket(): void {
        this.socket.auth = {username: 'Meloen', sessionID: localStorage.getItem('USERID')};

        this.socket.connect();
        this.createSession();
        this.getAllOnlineFriends();
        this.friendLoggedIn();
        this.receivePrivateMessageListener();
        this.connect();
        this.disconnect();
        this.friendLoggedOut();
    }

    createSession(): void {
        this.socket.on('session', ({sessionID}) => {
            // attach the session ID to the next reconnection attempts
            this.socket.auth = {sessionID};
            // store it in the localStorage
            localStorage.setItem('sessionID', sessionID);
            // save the ID of the user
            // this.socket.userID = userID;
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

    clearChatListeners(): void {
        this.socket.off('private message');
        this.socket.off('new message');
    }

    connect(): void {
        this.socket.on('connect', () => {
            this.users.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                }
            });
        });
    }

    disconnect(): void {
        this.socket.on('disconnect', () => {
            this.users.forEach((user) => {
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
            this.users = users.sort((a, b) => {
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

    friendLoggedIn(): void {
        this.socket.on('user connected', (user) => {
            this.initReactiveProperties(user);
            this.users.push(user);
        });
    }

    friendLoggedOut(): void {
        this.socket.on('user disconnected', (id) => {
            for (const user of this.users) {
                if (user.userID === id) {
                    user.connected = false;
                    break;
                }
            }
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
                if (message.id === res.id) {
                    message.messages.push({username: res.user, message: res.message, received: true});
                }
            }
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
