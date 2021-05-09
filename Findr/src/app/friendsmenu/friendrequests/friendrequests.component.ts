import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friendrequests',
  templateUrl: './friendrequests.component.html',
  styleUrls: ['./friendrequests.component.css']
})
export class FriendrequestsComponent implements OnInit {
  public _friend:String;
  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set friend(friend:String){
    this._friend = friend;
  }

  get friend(){
    return this._friend;
  }

  addFriend(){
    console.log("new friend :D");
  }

  deleteRequest(){
    console.log("delete >:)");
  }

  blockUser(){
    console.log("block >:(");
  }
}
