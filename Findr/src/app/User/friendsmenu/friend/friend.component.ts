import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../../chatmenu/chat.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: string;

  constructor(private router: Router, private chat: ChatService) {
  }

  ngOnInit(): void {
  }

  startChat(): void {
      this.chat.private = true;
      this.router.navigate(["chats/"]);

      console.log("start chat");
  }

  deleteFriend(): void {
    console.log("delete friend");
  }

  blockFriend(): void {
    console.log("block friend");
  }

}
