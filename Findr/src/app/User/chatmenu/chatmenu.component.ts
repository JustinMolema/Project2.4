import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-chatmenu',
    templateUrl: './chatmenu.component.html',
    styleUrls: ['./chatmenu.component.css']
})
export class ChatmenuComponent implements OnInit {

    constructor() { }

    messages = [];

    ngOnInit(): void {
    }

    addMessage(message: string, received: boolean): void {
        this.messages.push({message, received});
        this.messages.push({message: 'ja', received: false});
    }
}
