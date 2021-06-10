import {Component, OnInit, AfterViewChecked, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ChatService} from './chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-chatmenu',
    templateUrl: './chatmenu.component.html',
    styleUrls: ['./chatmenu.component.css']
})
export class ChatmenuComponent implements OnInit, AfterViewChecked, OnDestroy {
    username: string;
    roomName: string;
    form: FormGroup;
    messages = [];
    @ViewChild('chat') private scrollContainer: ElementRef;
    names = ["Anne Pier", "Robbin", "Harald", "Merel", "Justin"];

    constructor(private fb: FormBuilder, private chat: ChatService, private route: ActivatedRoute) {
        this.createForm();
        this.username = this.names[this.getRandomInt(this.names.length)];

        if (chat.private) this.loadPrivateChat();
        else this.loadPublicChat();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void{
        this.chat.leaveGameRoom({user: this.username, room: this.roomName});
    }

    loadPublicChat(): void {
        this.joinRoom();
        this.receiveMessageListener();
    }

    loadPrivateChat(): void {
        this.receivePrivateMessageListener();
    }
    getRandomInt(max): number {
        return Math.floor(Math.random() * max);
    }

    ngAfterViewChecked(): void {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err) {
        }
    }

    createForm(): void {
        this.form = this.fb.group({
            message: ['', Validators.required],
        });
    }

    joinRoom(): void {
        this.route.params.subscribe(params => {
            this.roomName = params.room;
            this.chat.joinGameRoom({user: this.username, room: this.roomName});
        });
    }

    addMessage(message: string, received: boolean): void {
        this.messages.push({username: this.username, message, received});
        this.sendMessage(message);
        this.clearInputfield();
    }

    sendMessage(message: string): void {
        if (this.chat.private) this.chat.sendPrivateMessage({user: this.username, message, room: 1});
        else this.chat.sendMessageToGameChat({user: this.username, message, room: this.roomName});
    }

    receiveMessageListener(): void {
        this.chat.newMessageReceivedFromGameChat().subscribe(res => {
            this.messages.push({username: res.user, message: res.message, received: true});
        });
    }

    receivePrivateMessageListener(): void {
        this.chat.receivedPrivateMessage().subscribe(res => {
            console.log(res);
            this.messages.push({username: res.user, message: res.message, received: true});
        });
    }


    clearInputfield(): void {
        this.form.controls.message.reset();
    }
}
