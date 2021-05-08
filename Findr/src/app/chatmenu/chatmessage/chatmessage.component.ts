import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatmessage',
  templateUrl: './chatmessage.component.html',
  styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {
  
  received:boolean = false;
  message:string = "hey lekker ding kom je hier vaker ;)";

  constructor() { }

  ngOnInit(): void {
  }

}
