import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    _name:String;
    _offense:String;

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
  set offense(offense:String){
      this._offense = offense;
  }

  get offense(){
      return this._offense;
  }
}