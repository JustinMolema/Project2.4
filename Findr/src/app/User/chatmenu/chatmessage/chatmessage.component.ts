import {Component, OnInit, Input} from '@angular/core';
import {FriendactionsService} from '../../services/friendactions.service';

@Component({
    selector: 'app-chatmessage',
    templateUrl: './chatmessage.component.html',
    styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
    @Input() message;

    constructor(private friendActionService: FriendactionsService) {
    }

    ngOnInit(): void {
    }

    sendFriendRequest(): void {
        this.friendActionService.sendFriendRequest(this.message.userID).subscribe();
    }

    reportUser(): void {
        this.friendActionService.reportUser(this.message).subscribe();
    }

    blockUser(): void {
        this.friendActionService.blockUser(this.message.userID).subscribe();
    }
}
