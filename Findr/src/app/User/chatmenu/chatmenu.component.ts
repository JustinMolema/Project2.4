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
        this.joinRoom();
        this.receiveMessageListener();
        this.receivePrivateMessageListener();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void{
        this.chat.leaveRoom({user: this.username, room: this.roomName});
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
            this.chat.joinRoom({user: this.username, room: this.roomName});
        });
    }

    addMessage(message: string, received: boolean): void {
        this.messages.push({username: this.username, message, received});
        this.sendMessage(message);
        this.clearInputfield();
    }

    sendMessage(message: string): void {
        // this.chat.sendPrivateMessage({user: this.username, message, room: 1});
        this.chat.sendMessage({user: this.username, message, room: this.roomName});
    }

    receiveMessageListener(): void {
        this.chat.newMessageReceived().subscribe(res => {
            this.messages.push({username: res.user, message: res.message, received: true});
        });
    }

    receivePrivateMessageListener(): void {
        console.log("aa");
        this.chat.receivedPrivateMessage().subscribe(res => {
            console.log(res);
            this.messages.push({username: res.user, message: res.message, received: true});
        });
    }

    clearInputfield(): void {
        this.form.controls.message.reset();
    }
}
