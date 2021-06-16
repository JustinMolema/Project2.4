import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ChatService } from '../../chatmenu/chat.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: string;
  @Input() friendID: string;
  @Input() pic;

  constructor(private router: Router, private chat: ChatService, private appService: AppService, private sanitiser: DomSanitizer) { }
  @Output()
  refresh: EventEmitter<string> = new EventEmitter<string>();


  ngOnInit(): void {
    if (this.pic) {
      this.pic = this.sanitize(decodeURIComponent(this.pic));
    }
  }

  sanitize(url: string) {
    return this.sanitiser.bypassSecurityTrustResourceUrl(url);
  }

  startChat(): void {
    this.chat.private = true;
    this.router.navigate(["chats/"]);
  }

  deleteFriend(): void {
    this.appService.deleteFriend(this.friendID).subscribe(res => {
      this.refresh.emit('hoi');
    });

  }

  blockFriend(): void {
    this.appService.blockFriend(this.friendID).subscribe(res => {
      this.refresh.emit('hoi');
    });

  }

}
