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
    messages = [{userID: "1234", datetime: Date.now(), username: 'Jos', message: 'asdasdfadsfsadfsdafsadfdsafasdfsadfdsafasdfsadfsadfasdfdsafasfasfasdfasfasfasdfasdfasfsdafasfdasdfasdfasdfasdad', received: true}];
    names = ["Anne Pier", "Robbin", "Harald", "Merel", "Justin"];

    @ViewChild('chat') private scrollContainer: ElementRef;
    constructor(private fb: FormBuilder, private chat: ChatService, private route: ActivatedRoute) {
        this.createForm();
        this.username = this.names[this.getRandomInt(this.names.length)];
        if (!chat.private) this.loadPublicChat();
    }

    ngOnInit(): void {
        for (const message of this.chat.privateMessages) {
            if (message.userID === this.chat.receiverID) {
                this.messages = message.messages;
                break;
            }
        }
    }

    ngOnDestroy(): void {
        this.chat.leaveGameRoom({user: this.username, room: this.roomName});
        this.chat.clearChatListeners();
    }

    loadPublicChat(): void {
        this.joinRoom();
        this.receiveMessageListener();
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
        this.messages.push({userID: localStorage.getItem("userID"), datetime: Date.now(), username: this.username, message, received});
        this.sendMessage(message);
        this.clearInputfield();
    }

    sendMessage(message: string): void {
        if (this.chat.private) this.chat.sendPrivateMessage({user: this.username, message, room: this.chat.receiverID});
        else this.chat.sendMessageToGameChat({userID: localStorage.getItem("userID"), user: this.username, message, room: this.roomName});
    }

    receiveMessageListener(): void {
        this.chat.newMessageReceivedFromGameChat().subscribe(res => {
            this.messages.push({userID: res.userID, datetime: Date.now(), username: res.user, message: res.message, received: true});
        });
    }

    clearInputfield(): void {
        this.form.controls.message.reset();
    }
}
