import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  /*onClick($event: any): Observable<any> {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    return undefined;
  }*/

  onClick():void{
    console.log("chats clicked")
  }
}
