import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendsmenu',
  templateUrl: './friendsmenu.component.html',
  styleUrls: ['./friendsmenu.component.css']
})
export class FriendsmenuComponent implements OnInit {
  friends = ["henk", "jan", "jeff"]
  friendRequests = ["simon", "jos"]
  blockedUsers = ["richard", "jeroen"]

  constructor() { }

  ngOnInit(): void {
  }

}
