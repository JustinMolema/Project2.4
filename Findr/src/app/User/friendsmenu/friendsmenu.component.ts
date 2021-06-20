import {Component, Input, OnInit} from '@angular/core';

import {AppService} from 'src/app/app.service';
import {TopbarService} from '../topbar/topbar.service';

@Component({
    selector: 'app-friendsmenu',
    templateUrl: './friendsmenu.component.html',
    styleUrls: ['./friendsmenu.component.css']
})
export class FriendsmenuComponent implements OnInit {



    constructor(private topbarService: TopbarService, private appService: AppService) {
    }

    ngOnInit(): void {
        this.appService.setFriendInfo();
    }

    @Input() refreshFriendInfo(event): void {
        this.appService.setFriendInfo();
    }

    showFriendTab(blockView: any, friendView: any): void {
        blockView.style.display = 'none';
        friendView.style.display = 'flex';
    }

    showBlockedUserTab(blockView: any, friendView: any): void {
        blockView.style.display = 'flex';
        friendView.style.display = 'none';
    }

    sendFriendRequest(): void {
        const id = prompt("Please enter the ID you want to add");
        if (id) {
            this.appService.sendFriendRequest(id).subscribe(res => {
                this.appService.setFriendInfo();
            });
        }
    }
}
