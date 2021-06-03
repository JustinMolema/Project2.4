import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: String;

  constructor() {
  }

  ngOnInit(): void {
  }

  startChat() {
    console.log("start chat")
  }

  deleteFriend() {
    console.log("delete friend")
  }

  blockFriend() {
    console.log("block friend")
  }

}
