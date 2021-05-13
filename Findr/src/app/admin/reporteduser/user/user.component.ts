import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    _name:String;
    _offense:String;
    _actions:String;
    _date:Date;

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set name(name:String){
      this._name = name;
  }

  get name(){
      return this._name;
  }

  @Input()
  set actions(actions:String){
      this._actions = actions;
  }

  get actions(){
      return this._actions;
  }

  @Input()
  set offense(offense:String){
      this._offense = offense;
  }

  get offense(){
      return this._offense;
  }
  
  @Input()
  set date(date:Date){
      this._date = date;
  }

  get date(){
      return this._date;
  }


}