import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';

@Component({
    selector: 'app-chatmenu',
    templateUrl: './chatmenu.component.html',
    styleUrls: ['./chatmenu.component.css']
})
export class ChatmenuComponent implements OnInit {

    constructor(private chat: ChatService) {
        chat.joinRoom({user: 'testUser', room: 'testRoom'});
    }

    messages = [{message: 'dasdaadadsasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', received: false},
        {message: 'ja', received: true}];

    ngOnInit(): void {
    }

    addMessage(message: string, received: boolean): void {
        this.messages.push({message, received});
        this.messages.push({message: 'ja', received: false});
    }
}
