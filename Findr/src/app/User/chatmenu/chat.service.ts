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

    constructor() {
    }

    openSocket(): void {
        this.socket.auth = {username: 'Meloen'};
        this.socket.connect();

        this.getAllOnlineFriends();
        this.friendLoggedIn();
        this.connect();
        this.disconnect();
        this.friendLoggedOut();
    }

    closeSocket(): void {
        this.socket.disconnect();
        this.socket.off("connect");
        this.socket.off("disconnect");
        this.socket.off("users");
        this.socket.off("user connected");
        this.socket.off("user disconnected");
        this.socket.off("private message");
    }

    connect(): void {
        this.socket.on('connect', () => {
            let a = true;
            console.log(this.users);
            console.log(a);

            this.users.forEach((user) => {
                if (user.self) {
                    user.connected = true;
                    a = false;
                }
            });
        });
    }

    disconnect(): void {
        this.socket.on("disconnect", () => {
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
            for (let i = 0; i < this.users.length; i++) {
                const user = this.users[i];
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

    sendPrivateMessage(data): void {
        this.socket.emit('private message', data);
    }

    receivedPrivateMessage(): Observable<any> {
        return new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('private message', (data) => {
                console.log('d');
                console.log(data.room);
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        // for (let i = 0; i < this.users.length; i++) {
        //     const user = this.users[i];
        //     if (user.userID === from) {
        //         user.messages.push({
        //             content,
        //             fromSelf: false,
        //         });
        //         if (user !== this.selectedUser) {
        //             user.hasNewMessages = true;
        //         }
        //         break;
        //     }
        // }
    }
}
