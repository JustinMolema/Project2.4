import {Component, OnInit} from '@angular/core';
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

    setFriendInfo(): void {
        combineLatest([
            this.getFriendsFromServer(),
            this.getFriendRequestsFromServer(),
            this.getBlockedUsersFromServer()]
        ).subscribe(([friendsFromServer, friendRequestsFromServer, blockedUsersFromServer]) => {

            friendsFromServer[0].forEach(element => {
                this.friends.push(element)
            });

            friendRequestsFromServer[0].forEach(element => {
                console.log(element)
                this.friendRequests.push(element)
            });

            blockedUsersFromServer[0].forEach(element => {
                this.blockedUsers.push(element)
            });

        })
    }

    getFriendsFromServer(): Observable<any> {
        return this.appService.getFriends(this.appService.storedUserID);
    }

    getFriendRequestsFromServer(): Observable<any> {
        return this.appService.getFriendRequests(this.appService.storedUserID);
    }

    getBlockedUsersFromServer(): Observable<any> {
        return this.appService.getBlockedUsers(this.appService.storedUserID);
    }

    showFriendTab(blockView: any, friendView: any): void {
        blockView.style.display = "none";
        friendView.style.display = "flex";
    }

    showBlockedUserTab(blockView: any, friendView: any): void {
        blockView.style.display = "flex";
        friendView.style.display = "none";
    }
}
