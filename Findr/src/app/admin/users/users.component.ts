import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Admindata} from '../admindata';
import {AdmindataService} from '../admindata.service';
import {GamesService} from '../games/games.service';
import {GamesComponent} from "../games/games.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends Admindata implements OnInit {
    constructor(public admindataService: AdmindataService, private cdref: ChangeDetectorRef) {
        super(null, admindataService);
    }

    ngOnInit(): void {
    }

    getData(): void {
        this.admindataService.getUsers().subscribe(response => {
            this.fillData(response);
            this.allowViewToLoad(["Username", "Email", "Warnings", "Banned"]);
        });
    }
}
