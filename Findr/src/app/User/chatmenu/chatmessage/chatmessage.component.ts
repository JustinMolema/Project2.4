import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
  
  received:boolean = false;
  public message:string = "hey lekker ding kom je hier vaker ;)";

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set chatmessage(msg:string)
  {
    this.message = msg;
  }

  
  get chatmessage()
  {
    return this.message
  }

  @Input()
  set chatreceived(rec:boolean)
  {
    this.received = rec;
  }

  
  get chatreceived()
  {
    return this.received
  }
}
