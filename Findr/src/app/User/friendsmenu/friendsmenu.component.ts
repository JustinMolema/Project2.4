import {Component, Input, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {TopbarService} from '../topbar/topbar.service';
import {combineLatest, Observable} from 'rxjs';

@Component({
    selector: 'app-friendsmenu',
    templateUrl: './friendsmenu.component.html',
    styleUrls: ['./friendsmenu.component.css']
})
export class FriendsmenuComponent implements OnInit {

    friends = [];
    friendRequests = [];
    blockedUsers = [];

    constructor(private topbarService: TopbarService, private appService: AppService) {
    }

    ngOnInit(): void {
        this.setFriendInfo();
    }

    @Input() refreshFriendInfo(event): void {
        this.setFriendInfo();
    }

    setFriendInfo(): void {
        this.getFriendsFromServer();
        this.getFriendRequestsFromServer();
        this.getBlockedUsersFromServer();
    }

    getFriendsFromServer(): void {
        this.friends = [];
        this.appService.getFriends().subscribe(friendsFromServer => {
            friendsFromServer[0].forEach(element => {
                this.friends.push(element);
                this.appService.friends.push(element);
            });
        });
    }

    getFriendRequestsFromServer(): void {
        this.friendRequests = [];
        this.appService.getFriendRequests().subscribe(friendRequestsFromServer => {
            friendRequestsFromServer[0].forEach(element => {
                this.friendRequests.push(element);
            });
        });
    }

    getBlockedUsersFromServer(): void {
        this.blockedUsers = [];
        this.appService.getBlockedUsers().subscribe(([blockedUsersFromServer]) => {
            blockedUsersFromServer[0].forEach(element => {
                this.blockedUsers.push(element);
            });
        });
    }

    showFriendTab(blockView: any, friendView: any): void {
        blockView.style.display = 'none';
        friendView.style.display = 'flex';
    }

    showBlockedUserTab(blockView: any, friendView: any): void {
        blockView.style.display = 'flex';
        friendView.style.display = 'none';
    }

    sendFriendRequest(): void {
        const id = prompt('please enter the id you want to add');
        this.appService.sendFriendRequest(id).subscribe(res => {
            this.setFriendInfo();
        });
    }
}
