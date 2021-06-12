import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ApplicationRef} from '@angular/core';

import {Router} from '@angular/router';
import {AppService} from 'src/app/app.service';
import {ChatService} from '../../chatmenu/chat.service';

@Component({
    selector: 'app-friend',
    templateUrl: './friend.component.html',
    styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit, AfterViewInit {
    @Input() friend: string;
    @Input() friendID: string;
    stable;
    status = "Offline";

    constructor(private router: Router, private chat: ChatService, private appService: AppService, private app: ApplicationRef) {
    }

    @Output()
    refresh: EventEmitter<string> = new EventEmitter<string>();


    ngOnInit(): void {
        this.setStatus();
        this.stabilizeListener();
    }

    ngAfterViewInit(): void {
    }

    stabilizeListener(): void {
        this.stable = this.app.isStable.subscribe((isStable) => {
            if (isStable) {
                setTimeout(() => {
                    this.setStatus();
                }, 500);
                this.stable.unsubscribe();
            }
        });
    }

    setStatus(): void {
        for (const friend of this.chat.onlineFriends) {
            if (friend.userID === this.friendID) {
                this.status = "Online";
            }
        }

        this.chat.friendLoggedIn().subscribe(res => {
            console.log(this.friendID, res.userID);
            if (this.friendID === res.userID) {
                console.log("d");
                this.status = "Online";
            }
        });
    }

    startChat(): void {
        this.chat.private = true;
        this.chat.to = this.friendID;
        this.router.navigate(['chats/']);
    }

    deleteFriend(): void {
        this.appService.deleteFriend(this.friendID).subscribe(res => {
            this.refresh.emit('hoi');
        });
    }

    blockFriend(): void {
        this.appService.blockFriend(this.friendID).subscribe(res => {
            this.refresh.emit('hoi');
        });
    }

}
