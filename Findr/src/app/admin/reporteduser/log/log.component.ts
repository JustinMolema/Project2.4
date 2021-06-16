import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
    @Input() reportedUserInfo;
    @Input() returnToViewLog;
    constructor() {
    }

    ngOnInit(): void {
        console.log(this.reportedUserInfo);
    }

    returnToReportedUsers(): void {
        this.returnToViewLog();
    }
}
