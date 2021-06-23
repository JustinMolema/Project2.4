import {Component, OnInit, Input} from '@angular/core';
import {FriendactionsService} from '../../services/friendactions.service';
import {AppService} from "../../../app.service";

@Component({
    selector: 'app-chatmessage',
    templateUrl: './chatmessage.component.html',
    styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
    @Input() message;
    dbPicture;
    constructor(private friendActionService: FriendactionsService, public appService: AppService) {
    }

    ngOnInit(): void {
        this.dbPicture = this.message.profilePicture;
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
