import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-blockedusers',
  templateUrl: './blockedusers.component.html',
  styleUrls: ['./blockedusers.component.css']
})
export class BlockedusersComponent implements OnInit {
  @Input() user: string;

  constructor() { }

  ngOnInit(): void {
  }

  unblock(): void {
    console.log("unblock");
  }
}
