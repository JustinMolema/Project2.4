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

    @Input() refreshFriendInfo(event){
        console.log("refreshed page")
        this.setFriendInfo();
    }

    setFriendInfo(): void {

        this.friends = [];
        this.friendRequests = [];
        this.blockedUsers = [];

        combineLatest([
            this.getFriendsFromServer(),
            this.getFriendRequestsFromServer(),
            this.getBlockedUsersFromServer()]
        ).subscribe(([friendsFromServer, friendRequestsFromServer, blockedUsersFromServer]) => {

            friendsFromServer[0].forEach(element => {
                this.friends.push(element)
                this.appService.friends.push();
            });

            friendRequestsFromServer[0].forEach(element => {
                this.friendRequests.push(element)
            });

            blockedUsersFromServer[0].forEach(element => {
                this.blockedUsers.push(element)
            });

        });
    }

    getFriendsFromServer(): Observable<any> {
        return this.appService.getFriends();
    }

    getFriendRequestsFromServer(): Observable<any> {
        return this.appService.getFriendRequests();
    }

    getBlockedUsersFromServer(): Observable<any> {
        return this.appService.getBlockedUsers();
    }

    showFriendTab(blockView: any, friendView: any): void {
        blockView.style.display = "none";
        friendView.style.display = "flex";
    }

    showBlockedUserTab(blockView: any, friendView: any): void {
        blockView.style.display = "flex";
        friendView.style.display = "none";
    }

    sendFriendRequest(): void{
        var id = prompt("please enter the id you want to add");
        this.appService.sendFriendRequest(id).subscribe(res => {
            this.setFriendInfo();
            })
    }
}
