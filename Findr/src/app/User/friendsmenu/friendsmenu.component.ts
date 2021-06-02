import {Component, OnInit} from '@angular/core';
import { TopbarService } from '../topbar/topbar.service';

@Component({
  selector: 'app-friendsmenu',
  templateUrl: './friendsmenu.component.html',
  styleUrls: ['./friendsmenu.component.css']
})
export class FriendsmenuComponent implements OnInit {
  friends = ["Harald", "Anne Pier", "Justin", "Robbin"];
  friendRequests = ["Simon", "Jos", "Wijmar"];
  blockedUsers = ["Richard", "Jeroen"];

  //TODO: push tabs further to left when topbar is triggered
  constructor(private topbarService: TopbarService) {
  }

  ngOnInit(): void {
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
