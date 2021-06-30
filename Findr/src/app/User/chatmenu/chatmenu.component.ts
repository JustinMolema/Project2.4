import {AfterViewChecked, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChatService} from './chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AppService} from "../../app.service";
import {globalFindrMethods} from "../../sharedmodule/global.findr.methods";

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

    constructor(private fb: FormBuilder, private appService: AppService, private chat: ChatService,
                private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private findrMethods: globalFindrMethods) {
        this.createForm();
        if (this.appService.user) this.initializeChat();
        else this.appService.canLoad().subscribe(res => this.initializeChat());
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.chat.leaveGameRoom({user: this.username, room: this.roomName});
    }

    initializeChat(): void {
        this.username = this.appService.user.Username;

        this.chat.setRef(this.cdRef);
        if (!this.chat.private) this.loadPublicChat();
        else if (this.chat.private) this.loadPrivateChat();
    }

    loadPrivateChat(): void {
        for (const message of this.chat.privateMessages) {
            if (message.userID === this.chat.receiverID) {
                this.messages = message.messages;
                break;
            }
        }
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
        this.messages.push({
            userID: localStorage.getItem("userID"),
            datetime: Date.now(),
            username: this.username,
            profilePicture: this.findrMethods.sanitize(decodeURIComponent(this.appService.user.Profile_picture)),
            message,
            received
        });
        this.sendMessage(message);
        this.clearInputfield();
    }

    sendMessage(message: string): void {
        if (this.chat.private) this.chat.sendPrivateMessage({
            user: this.username,
            message,
            profilePicture: this.appService.user.Profile_picture,
            room: this.chat.receiverID
        });
        else this.chat.sendMessageToGameChat({
            userID: localStorage.getItem("userID"),
            user: this.username,
            profilePicture: this.appService.user.Profile_picture,
            message,
            room: this.roomName
        });
    }

    receiveMessageListener(): void {
        this.chat.newMessageReceivedFromGameChat().subscribe(res => {
            this.messages.push({
                userID: res.userID,
                datetime: Date.now(),
                username: res.user,
                message: res.message,
                profilePicture: this.findrMethods.sanitize(decodeURIComponent(res.profilePicture)),
                received: true
            });
            this.cdRef.detectChanges();
        });
    }

    clearInputfield(): void {
        this.form.controls.message.reset();
    }
}
