import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../../app.service';
import {TopbarService} from '../../topbar/topbar.service';
import {NavbarService} from "../navbar.service";

@Component({
    selector: 'app-friendslist',
    templateUrl: './friendslist.component.html',
    styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {

    collapsed = true;
    showMoreText = 'Show More ⬎';
    sliceAmount = 5;
    topbar: TopbarService;

    constructor(private topbarService: TopbarService, public appService: AppService, private navbarService: NavbarService) {
        this.topbar = topbarService;
    }

    ngOnInit(): void {

    }

    toggleList(): void {
        if (this.collapsed) {
            this.sliceAmount = this.appService.friends.length;
            this.showMoreText = 'Show Less ⬏';
        } else {
            this.sliceAmount = 5;
            this.showMoreText = 'Show More ⬎';
        }

        this.collapsed = !this.collapsed;

        if (this.collapsed){

        }
    }
}
