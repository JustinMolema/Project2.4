import {Injectable} from '@angular/core';
import {io} from 'socket.io-client';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor() {
    }

    private socket = io('http://localhost:8081');

    joinRoom(data): void {
        this.socket.emit('join', data);
    }

    newUserJoined(): Observable<any> {
        return new Observable<{ user: string, message: string }>(observer => {
            this.socket.on('new user joined', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
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
