import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blockedusers',
  templateUrl: './blockedusers.component.html',
  styleUrls: ['./blockedusers.component.css']
})
export class BlockedusersComponent implements OnInit {
  public _user:String;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set user(user:String){
    this._user = user;
  }

  get user(){
    return this._user;
  }

  unblock(){
    console.log("unblock :D")
  }

}
