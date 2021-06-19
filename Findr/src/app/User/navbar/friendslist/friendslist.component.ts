import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../../app.service';
import {TopbarService} from '../../topbar/topbar.service';

@Component({
    selector: 'app-friendslist',
    templateUrl: './friendslist.component.html',
    styleUrls: ['./friendslist.component.css']
})
export class FriendslistComponent implements OnInit {

    friends = this.appService.friends;
    collapsed = true;
    showMoreText = 'Show More ⬎';
    sliceAmount = 5;
    topbar: TopbarService;

    constructor(private topbarService: TopbarService, private appService: AppService) {
        this.topbar = topbarService;
    }

    ngOnInit(): void {
        this.friends = this.appService.friends;
    }

    toggleList(): void {
        if (this.collapsed) {
            this.sliceAmount = this.friends.length;
            this.showMoreText = 'Show Less ⬏';
        } else {
            this.sliceAmount = 5;
            this.showMoreText = 'Show More ⬎';
        }

        this.collapsed = !this.collapsed;

        if (this.collapsed){

        }
    }

    @Input() refreshFriendInfo(event): void {
        console.log("refreshed friendslist")
        this.friends = this.appService.friends;
    }

}
