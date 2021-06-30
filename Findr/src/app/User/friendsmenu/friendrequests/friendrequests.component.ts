import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {ChatService} from '../../chatmenu/chat.service';

@Component({
    selector: 'app-friendrequests',
    templateUrl: './friendrequests.component.html',
    styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {

    @Input() friend: string;
    @Input() friendID: string;
    @Input() pic;

    @Output()
    refresh: EventEmitter<string> = new EventEmitter<string>();

    constructor(private appService: AppService, private chat: ChatService) {
    }

    ngOnInit(): void {
    }

    addFriend(): void {
        this.appService.acceptFriendRequest(this.friend).subscribe(res => {
            this.chat.onlineFriends.push(this.friendID);
            this.chat.privateMessages.push({userID: this.friendID, messages: []});
            this.refresh.emit('add');
        });

    }

    deleteRequest(): void {
        this.appService.deleteFriendRequest(this.friend).subscribe(res => {
            this.refresh.emit('delete');
        });

    }

    blockUser(): void {
        this.appService.blockFriend(this.friend).subscribe(res => {
            this.refresh.emit('bloqq');
        });
    }
}
