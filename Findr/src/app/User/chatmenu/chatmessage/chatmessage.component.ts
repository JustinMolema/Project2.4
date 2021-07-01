import {Component, Input, OnInit} from '@angular/core';
import {FriendactionsService} from '../../services/friendactions.service';
import {AppService} from "../../../app.service";
import {ChatService} from '../chat.service';

@Component({
    selector: 'app-chatmessage',
    templateUrl: './chatmessage.component.html',
    styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
    @Input() message;
    dbPicture;
    constructor(private friendActionService: FriendactionsService, public appService: AppService, public chat: ChatService) {
    }

    ngOnInit(): void {
        this.dbPicture = this.message.profilePicture;
    }

    deleteFriend(): void {
        this.appService.deleteFriend(this.message.username).subscribe();
        this.appService.friends.splice(this.appService.friends.findIndex(item => item.Username === this.message.username), 1);

    }

    sendFriendRequest(): void {
        this.friendActionService.sendFriendRequest(this.message.username).subscribe();
    }

    reportUser(): void {
        this.friendActionService.reportUser(this.message).subscribe();
    }

    blockUser(): void {
        this.appService.blockFriend(this.message.username).subscribe(() => this.appService.getBlockedUsersFromServer());
    }
}
