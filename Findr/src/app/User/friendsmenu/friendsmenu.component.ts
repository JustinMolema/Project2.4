import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AppService} from 'src/app/app.service';
import {TopbarService} from '../topbar/topbar.service';

@Component({
    selector: 'app-friendsmenu',
    templateUrl: './friendsmenu.component.html',
    styleUrls: ['./friendsmenu.component.css']
})
export class FriendsmenuComponent implements OnInit {

    friends = [];
    friendRequests = [];
    blockedUsers = [];

    constructor(private topbarService: TopbarService, private appService: AppService, private sanitiser: DomSanitizer) {
    }

    ngOnInit(): void {
        this.setFriendInfo();
    }

    @Input() refreshFriendInfo(event): void {
        this.setFriendInfo();
    }

    sanitize(url: string): SafeResourceUrl {
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }

    setFriendInfo(): void {
        this.appService.friends = [];
        this.getFriendsFromServer();
        this.getFriendRequestsFromServer();
        this.getBlockedUsersFromServer();
    }

    getFriendsFromServer(): void {
        this.friends = [];
        this.appService.getFriends().subscribe(friendsFromServer => {
            if (friendsFromServer.length > 0) {
                friendsFromServer.forEach(element => {
                    if (element.Profile_picture) {
                        element.Profile_picture = this.sanitize(decodeURIComponent(element.Profile_picture));
                    }
                    this.friends.push(element);
                    this.appService.friends.push(element);
                });
            }
        });
    }

    getFriendRequestsFromServer(): void {
        this.friendRequests = [];
        this.appService.getFriendRequests().subscribe(friendRequestsFromServer => {
            if (friendRequestsFromServer[0].length > 0) {
                friendRequestsFromServer[0].forEach(element => {
                    if (element.Profile_picture) {
                        element.Profile_picture = this.sanitize(decodeURIComponent(element.Profile_picture));
                    }
                    this.friendRequests.push(element)
                });
            }
        });
    }

    getBlockedUsersFromServer(): void {

        this.blockedUsers = [];
        this.appService.getBlockedUsers().subscribe(blockedUsersFromServer => {
            if (blockedUsersFromServer[0].length > 0) {
                blockedUsersFromServer[0].forEach(element => {
                    if (element.Profile_picture) {
                        element.Profile_picture = this.sanitize(decodeURIComponent(element.Profile_picture));
                    }
                    this.blockedUsers.push(element);
                });
            }

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
        const id = prompt("Please enter the ID you want to add");
        if (id) {
            this.appService.sendFriendRequest(id).subscribe(res => {
                this.setFriendInfo();
            });
        }
    }
}
