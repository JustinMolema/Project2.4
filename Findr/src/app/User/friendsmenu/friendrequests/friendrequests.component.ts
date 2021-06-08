import {Component, Input, OnInit} from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {
  @Input() friend: string;
  @Input() friendID: string;

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
  }

  addFriend(): void {
    console.log("new friend");
    console.log("added: " + this.friend, + " " + this.friendID)
    this.appService.acceptFriendRequest(this.friendID).subscribe(res =>{
      
    })
  }

  deleteRequest(): void {
    console.log("delete");
  }

  blockUser(): void {
    console.log("block");
  }
}
