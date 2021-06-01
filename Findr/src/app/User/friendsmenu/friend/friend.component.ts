import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  startChat(): void {
    console.log("start chat");
  }

  deleteFriend(): void {
    console.log("delete friend");
  }

  blockFriend(): void {
    console.log("block friend");
  }

}
