import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: string;
  @Input() friendID: string;

  @Output()
  refresh: EventEmitter<string> = new EventEmitter<string>();

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
  }

  startChat(): void {
    console.log("start chat");
  }

  deleteFriend(): void {
    this.appService.deleteFriend(this.friendID).subscribe(res =>{

    })
  }

  blockFriend(): void {
    this.appService.blockFriend(this.friendID).subscribe(res =>{

    })
  }

}
