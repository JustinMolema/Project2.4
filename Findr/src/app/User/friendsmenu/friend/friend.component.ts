import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Router} from '@angular/router';
import { AppService } from 'src/app/app.service';
import {ChatService} from '../../chatmenu/chat.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: string;
  @Input() friendID: string;
  //@Input() pic: string;

  constructor(private router: Router, private chat: ChatService, private appService: AppService) {}
  @Output()
  refresh: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(): void {
  }

  startChat(): void {
      this.chat.private = true;
      this.router.navigate(["chats/"]);
  }

  deleteFriend(): void {
    this.appService.deleteFriend(this.friendID).subscribe(res => {
        this.refresh.emit('hoi');
    });

  }

  blockFriend(): void {
    this.appService.blockFriend(this.friendID).subscribe(res =>{
        this.refresh.emit('hoi');
    });

  }

}
