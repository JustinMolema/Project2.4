import { Component, OnInit } from '@angular/core';
import { TopbarService } from '../../topbar/topbar.service';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit {

  games = ["Fortnite", "Roblox", "Amogus", "Fall guys", "Five night at Freddy's", "Rollercoaster Tycoon", "Minecraft", "Raid: Shadow Legends", "Overwatch"];
  collapsed: boolean = true;
  showMoreText: string = "Show More ⬎";
  sliceAmount: number = 5;
  topbar: TopbarService

  constructor(private topbarService: TopbarService) { 
    this.topbar = topbarService;
  }

  ngOnInit(): void {
  }

  toggleList()
  {
    if(this.collapsed)
    {
      this.showMoreText = "Show Less ⬏";
      this.sliceAmount = this.games.length;
    }
    else
    {
      this.showMoreText = "Show More ⬎";
      this.sliceAmount = 5;
    }

    this.collapsed = !this.collapsed;
    console.log(this.collapsed);
  }

}
