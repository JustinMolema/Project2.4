import {Component, OnInit} from '@angular/core';

import { TopbarService } from '../../topbar/topbar.service';

@Component({
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {

  friends = ["Anne Pier", "Robbin", "Justin", "Merel", "Wijmar", "Henk", "Anne Pier Alt Account", "Richard", "Jos", "Harald"];
  collapsed: boolean = true;
  showMoreText: string = "Show More ⬎";
  sliceAmount = 5;
  topbar: TopbarService

  constructor(private topbarService: TopbarService) {
    this.topbar = topbarService;
  }

  ngOnInit(): void {
  }

  toggleList() {
    if (this.collapsed) {
      this.sliceAmount = this.friends.length;
      this.showMoreText = "Show Less ⬏";
    } else {
      this.sliceAmount = 5;
      this.showMoreText = "Show More ⬎";
    }

    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

}
