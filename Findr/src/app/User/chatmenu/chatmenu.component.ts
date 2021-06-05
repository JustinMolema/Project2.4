import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-chatmenu',
    templateUrl: './chatmenu.component.html',
    styleUrls: ['./chatmenu.component.css']
})
export class ChatmenuComponent implements OnInit {
    username: string;
    roomName: string;
    form: FormGroup;
    messages = [];

    constructor(private fb: FormBuilder, private chat: ChatService) {
        this.createForm();
        this.tempRoomSettings();
        this.receiveMessageListener();
    }

    ngOnInit(): void {
    }

    createForm(): void {
        this.form = this.fb.group({
            message: ['', Validators.required],
        });
    }

    tempRoomSettings(): void {
        this.username = prompt('Type username here');
        this.roomName = prompt('Type room here');
        this.chat.joinRoom({user: this.username, room: this.roomName});
    }

    addMessage(message: string, received: boolean): void {
        this.messages.push({username: this.username, message, received});
        this.sendMessage(message);
        this.clearInputfield();
    }

    sendMessage(text: string): void {
        this.chat.sendMessage({user: this.username, message: text, room: this.roomName});
    }

    receiveMessageListener(): void {
        this.chat.newMessageReceived().subscribe(res => {
            this.messages.push({username: res.user, message: res.message, received: true});
        });
    }

    clearInputfield(): void {
        this.form.controls.message.reset();
    }
}
