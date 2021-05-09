import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

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

  startChat(){
    console.log("start chat!")
  }

  deleteFriend(){
    console.log("delete friend >:(")
  }

  blockFriend(){
    console.log("block friend:(")
  }

}
