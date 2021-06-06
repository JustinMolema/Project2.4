import {Component, OnInit} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { TopbarService } from '../topbar/topbar.service';

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
  friendRequests: [];
  blockedUsers : [];

  constructor(private topbarService: TopbarService, private appService: AppService) {}

  ngOnInit(): void {
    
    this.appService.getFriends(this.appService.storedUserID).subscribe(res =>{
      res.friendsInfo.forEach(element => {
        console.log(element);
        this.friends.push(element);
      });
    });
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
