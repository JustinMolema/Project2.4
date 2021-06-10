import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket;
    private userArray = [];

    constructor() {
    }

    joinRoom(data): void {
        this.socket.emit('join', data);

        this.currentUsers();
        this.userJoined();
    }

    createAndOpenSocket(): void {
        this.socket = io('http://localhost:8081');
        console.log("A");
        this.socket.auth = {username: "Meloen"};
        this.socket.connect();

        this.newUserJoined().subscribe(res => {
            console.log(res);
        });

        this.userLeft().subscribe(res => {
            console.log(res);
        });

        this.currentUsers();
        this.userJoined();
    }

    closeSocket(): void {
        this.socket.disconnect();
    }

    newUserJoined(): Observable<any> {
        return new Observable<{ user: any }>(observer => {
            this.socket.on('connect', () => {
                console.log('OEN');
            });
        });
    }

    currentUsers(): void {
        this.socket.on('users', (users) => {
            users.forEach((user) => {
                user.self = user.userID === this.socket.id;
            });
            console.log(users);
            this.userArray = users.sort((a, b) => {
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

    userJoined(): void {
        this.socket.on('user connected', (user) => {
            this.userArray.push(user);
            console.log(this.userArray);
        });
    }

    userLeft(): Observable<any> {
        return new Observable<{ user: any }>(observer => {
            this.socket.on('disconnect', () => {
                console.log('oun');
            });
        });
    }

    leaveRoom(data): void {
        this.socket.emit('leave', data);
    }

    userLeftRoom(): Observable<any> {
        return new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('left room', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }

    sendPrivateMessage(data): void {
        this.socket.emit('private message', data);
    }

    receivedPrivateMessage(): Observable<any> {
        return new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('private message', (data) => {
                console.log("d");
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

    sendMessage(data): void {
        this.socket.emit('message', data);
    }

    newMessageReceived(): Observable<any> {
        return new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }
}
