import {Component, OnInit} from '@angular/core';
import {NavitemService} from '../../nav-item.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, NavitemService {

  constructor() {
  }

  ngOnInit(): void {
    console.log('????????????');
  }

  onClick($event: any): Observable<any> {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    return undefined;
  }


}
