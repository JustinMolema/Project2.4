import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TopbarService } from '../topbar/topbar.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-friendsmenu',
  templateUrl: './friendsmenu.component.html',
  styleUrls: ['./friendsmenu.component.css']
})
export class FriendsmenuComponent implements OnInit {
  // friends = ["Harald", "Anne Pier", "Justin", "Robbin"];
  // friendRequests = ["Simon", "Jos", "Wijmar"];
  // blockedUsers = ["Richard", "Jeroen"];

  friends: [any];
  friendRequests: [any];
  blockedUsers: [any];
  
  constructor(private topbarService: TopbarService, private appService: AppService) { }


  ngOnInit(): void {
   
     combineLatest([
       this.getFriendsFromServer(),
       this.getFriendRequestsFromServer(),
       this.getBlockedUsersFromServer()]
     ).subscribe(([friendsFromServer, friendRequestsFromServer, blockedUsersFromServer]) => {
      friendsFromServer[0].array.forEach(element => {
        
      });
      console.log(friendsFromServer[0]);
      console.log(friendRequestsFromServer[0]);
      console.log(blockedUsersFromServer[0]);
     }) 
  }
  
  getFriendsFromServer()
  {
    return this.appService.getFriends(this.appService.storedUserID);
  }

  getFriendRequestsFromServer(){
    return this.appService.getFriendRequests(this.appService.storedUserID)
  }

  getBlockedUsersFromServer(){
    return this.appService.getBlockedUsers(this.appService.storedUserID)
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
