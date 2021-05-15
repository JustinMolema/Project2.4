import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  _date: Date;
  _time: Date;
  _tag: String;
  _status: String;
  constructor() {}

  @Input()
  set tag(tag: String) {
    this._tag = tag;
  }

  get tag() {
    return this._tag;
  }

  @Input()
  set status(status: String) {
    this._status = status;
  }

  get status() {
    return this._status;
  }

  @Input()
  set date(date: Date) {
    this._date = date;
  }

  get date() {
    return this._date;
  }

  @Input()
  set time(time:Date){
      this._time = time;
  }

  get time(){
      return this._time;
  }

  closeTicket(): void {
    if(confirm("Are you sure you want to close this ticket?")){
        alert("Ticket closed");
    }
  }

  ngOnInit(): void {}

}