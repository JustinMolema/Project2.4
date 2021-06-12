import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from 'src/app/app.service';

//import {combineLatest} from 'rxjs';

@Component({
    selector: 'app-friendrequests',
    templateUrl: './friendrequests.component.html',
    styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {
    @Input() friend: string;
    @Input() friendID: string;

    @Output()
    refresh: EventEmitter<string> = new EventEmitter<string>();

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
    }

    addFriend(): void {
        this.appService.acceptFriendRequest(this.friendID).subscribe(res => {
            console.log("????????????")
            this.refresh.emit('add');
        })

    }

    deleteRequest(): void {
        this.appService.deleteFriendRequest(this.friendID).subscribe(res => {
            this.refresh.emit('delet');
        })

    }

    blockUser(): void {
        this.appService.blockFriend(this.friendID).subscribe(res => {
            this.refresh.emit('bloqq');
        })
       
    }
}
