import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ApplicationRef} from '@angular/core';

import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

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
    @Input() pic;

    stable;
    status = 'Offline';

    constructor(private router: Router, private chat: ChatService, private appService: AppService, private app: ApplicationRef, private sanitiser: DomSanitizer) {
    }

    @Output()
    refresh: EventEmitter<string> = new EventEmitter<string>();


    ngOnInit(): void {
        if (this.pic) {
            this.pic = this.sanitize(decodeURIComponent(this.pic));
        }

        this.setStatusListeners();
        this.stabilizeListener();
    }

    ngAfterViewInit(): void {
    }

    stabilizeListener(): void {
        this.stable = this.app.isStable.subscribe((isStable) => {
            if (isStable) {
                setTimeout(() => {
                    this.setStatusListeners();
                }, 500);
                this.stable.unsubscribe();
            }
        });
    }

    sanitize(url: string): SafeResourceUrl {
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }

    setStatusListeners(): void {
        this.status = 'Offline';
        for (const friend of this.chat.onlineFriends) {
            if (friend.userID === this.friendID) {
                this.status = 'Online';
                break;
            }
        }

        this.chat.friendLoggedIn().subscribe(res => {
            this.changeStatus(res, 'Online');
        });

        this.chat.friendLoggedOut().subscribe(res => {
            this.changeStatus(res, 'Offline');
        });
    }

    changeStatus(res, status): void {
        if (this.friendID === res.userID) {
            this.status = status;
        }
    }

    startChat(): void {
        this.chat.private = true;
        this.chat.receiverID = this.friendID;
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
