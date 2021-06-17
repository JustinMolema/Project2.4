import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from 'src/app/app.service';

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

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
    }

    addFriend(): void {
        this.appService.acceptFriendRequest(this.friendID).subscribe(res => {
            this.refresh.emit('add');
        });

    }

    deleteRequest(): void {
        this.appService.deleteFriendRequest(this.friendID).subscribe(res => {
            this.refresh.emit('delete');
        });

    }

    blockUser(): void {
        this.appService.blockFriend(this.friendID).subscribe(res => {
            this.refresh.emit('bloqq');
        });
    }
}
