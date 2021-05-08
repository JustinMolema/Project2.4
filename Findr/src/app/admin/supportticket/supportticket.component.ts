import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-supportticket',
  templateUrl: './supportticket.component.html',
  styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit {
    _tag:String;
    _status:String;
    constructor() { 

    }

    @Input()
    set tag(tag:String){
      this._tag = tag;
    }

    get tag(){
        return this._tag;
    }

    @Input()
    set status(status:String){
        this._status = status;
    }

    get status(){
        return this._status;
    }

    closeTicket():void{
        console.log(this.tag);
    }

    ngOnInit(): void {
    }
}
