import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {
  @Input() friend: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  addFriend(): void {
    console.log("new friend");
  }

  deleteRequest(): void {
    console.log("delete");
  }

  blockUser(): void {
    console.log("block");
  }
}
