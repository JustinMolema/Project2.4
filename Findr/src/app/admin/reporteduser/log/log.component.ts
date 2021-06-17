import {Component, Input, OnInit} from '@angular/core';
import {AdmindataService} from "../../admindata.service";

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
    @Input() reportedUserInfo;
    @Input() returnToViewLog;
    constructor(public admindataService: AdmindataService) {
    }

    ngOnInit(): void {
        console.log(this.reportedUserInfo);
    }

    returnToReportedUsers(): void {
        this.returnToViewLog();
    }

    warnUser(): void {
        const dialogRef = this.reportedUserInfo.openDialogAndListenForClose();
        dialogRef.afterClosed().subscribe(res => {
            if (res === "Cancel" || res === undefined) return;
            this.admindataService.warnUser(this.reportedUserInfo.item.UserID).subscribe();
            this.returnToViewLog();
        });
    }

    banUser(): void {
        const dialogRef = this.reportedUserInfo.openDialogAndListenForClose();
        dialogRef.afterClosed().subscribe(res => {
            if (res === "Cancel" || res === undefined) return;
            this.admindataService.banUser(this.reportedUserInfo.item.UserID).subscribe();
            this.returnToViewLog();
        });
    }

    dismiss(): void {
        this.reportedUserInfo.openDialogAndListenForClose();
        this.returnToViewLog();
    }
}
