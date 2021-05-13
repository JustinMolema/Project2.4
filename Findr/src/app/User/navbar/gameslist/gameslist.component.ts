import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameslist',
  templateUrl: './gameslist.component.html',
  styleUrls: ['./gameslist.component.css']
})
export class GameslistComponent implements OnInit {

  games = ["Fortnite", "Roblox", "Amogus", "Fall guys", "Five night at Freddys", "Rollercoaster Tycoon", "Minecraft", "Raid: Shadow Legends", "Overwatch"];
  collapsed: boolean = true;
  showMoreText: string = "Show More ⬎";
  sliceAmount: number = 5;

  constructor() { }

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
