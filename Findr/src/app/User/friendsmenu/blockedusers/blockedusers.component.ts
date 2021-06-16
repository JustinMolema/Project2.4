import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-blockedusers',
  templateUrl: './blockedusers.component.html',
  styleUrls: ['./blockedusers.component.css']
})
export class BlockedusersComponent implements OnInit {
  @Input() user: string;
  @Input() userID: string;
  @Input() pic;

  @Output()
  refresh: EventEmitter<string> = new EventEmitter<string>();

  constructor(private appService: AppService, private sanitiser: DomSanitizer) { }

  ngOnInit(): void {
    if (this.pic) {
      this.pic = this.sanitize(decodeURIComponent(this.pic));
    }
  }

  sanitize(url: string) {
    return this.sanitiser.bypassSecurityTrustResourceUrl(url);
  }

  unblock(): void {
    this.appService.unblockUser(this.userID).subscribe(res => {

    })
    this.refresh.emit('hoi');
  }
}
