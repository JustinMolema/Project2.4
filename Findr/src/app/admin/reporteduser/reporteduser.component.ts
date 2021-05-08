import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporteduser',
  templateUrl: './reporteduser.component.html',
  styleUrls: ['./reporteduser.component.css']
})
export class ReporteduserComponent implements OnInit {
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
