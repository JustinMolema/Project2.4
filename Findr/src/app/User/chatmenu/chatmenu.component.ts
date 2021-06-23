import {Component, OnInit, AfterViewChecked, ViewChild, ElementRef, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {ChatService} from './chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AppService} from "../../app.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

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

    constructor(private fb: FormBuilder, private appService: AppService, private chat: ChatService, private route: ActivatedRoute, private cdRef: ChangeDetectorRef, private sanitiser: DomSanitizer) {
        this.createForm();
        this.username = this.appService.user.Username;

        chat.setRef(cdRef);
        if (!chat.private) this.loadPublicChat();
        else if (chat.private) this.loadPrivateChat();
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.chat.leaveGameRoom({user: this.username, room: this.roomName});
        this.chat.clearChatListeners();
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
            profilePicture: encodeURIComponent(this.appService.user.Profile_picture),
            message,
            received
        });
        this.sendMessage(message);
        this.clearInputfield();
    }

    sendMessage(message: string): void {
        if (this.chat.private) this.chat.sendPrivateMessage({user: this.username, message, room: this.chat.receiverID});
        else this.chat.sendMessageToGameChat({
            userID: localStorage.getItem("userID"),
            user: this.username,
            // profilePicture: encodeURIComponent(this.appService.user.Profile_picture),
            message,
            room: this.roomName
        });
    }

    receiveMessageListener(): void {
        this.chat.newMessageReceivedFromGameChat().subscribe(res => {
            console.log(res.user);
            this.messages.push({
                userID: res.userID,
                datetime: Date.now(),
                username: res.user,
                message: res.message,
                // profilePicture: this.appService.sanitize(decodeURIComponent(res.profilePicture)),
                received: true
            });
            console.log(res);
            this.cdRef.detectChanges();
        });
    }

    clearInputfield(): void {
        this.form.controls.message.reset();
    }
}
