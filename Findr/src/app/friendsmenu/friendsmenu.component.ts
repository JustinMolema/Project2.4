import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-friendsmenu',
  templateUrl: './friendsmenu.component.html',
  styleUrls: ['./friendsmenu.component.css']
})
export class FriendsmenuComponent implements OnInit {
  friends = ["henk", "jan", "jeff"]
  friendRequests = ["simon", "jos"]
  blockedUsers = ["richard", "jeroen"]

  constructor() {
  }

  ngOnInit(): void {

  }

  showFriendTab(blockView: any, friendView: any) {
    blockView.style.display = "none";
    friendView.style.display = "flex";
  }

  showBlockedUserTab(blockView: any, friendView: any) {
    blockView.style.display = "flex";
    friendView.style.display = "none";
  }

}
