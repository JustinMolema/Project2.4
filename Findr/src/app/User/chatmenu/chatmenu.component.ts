import {Component, OnInit, AfterViewChecked, ViewChild, ElementRef} from '@angular/core';
import {ChatService} from './chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-chatmenu',
    templateUrl: './chatmenu.component.html',
    styleUrls: ['./chatmenu.component.css']
})
export class ChatmenuComponent implements OnInit, AfterViewChecked {
    username: string;
    roomName: string;
    form: FormGroup;
    messages = [];
    @ViewChild('chat') private scrollContainer: ElementRef;

    constructor(private fb: FormBuilder, private chat: ChatService) {
        this.createForm();
        this.tempRoomSettings();
        this.receiveMessageListener();
    }

    ngOnInit(): void {
    }

    ngAfterViewChecked(): void{
        this.scrollToBottom();
    }

    scrollToBottom(): void{
        try{
            this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
        } catch (err){}
    }

    createForm(): void {
        this.form = this.fb.group({
            message: ['', Validators.required],
        });
    }

    tempRoomSettings(): void {
        this.username = "a" //prompt('Type username here');
        this.roomName = "b" //prompt('Type room here');
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
