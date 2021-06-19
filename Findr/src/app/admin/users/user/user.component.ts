import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AdminRow} from '../../AdminRow';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {AdmindataService} from '../../admindata.service';
import {UsersComponent} from "../users.component";

@Component({
  selector: 'app-adminuser',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AdminRow implements OnInit {
    @Input() item: any;
    @Input() keys = [];

    constructor(public snackBar: MatSnackBar, public dialog: MatDialog,
                public admindataService: AdmindataService) {
        super(snackBar, dialog, admindataService);
    }

    ngOnInit(): void {
    }

    warnUser(): void {
        const dialogRef = this.openDialogAndListenForClose();
        dialogRef.afterClosed().subscribe(res => {
            if (res === "Cancel" || res === undefined) return;
            this.item.Warnings++;
            this.admindataService.warnUser(this.item.User_ID).subscribe();
        });
    }

    banUser(): void {
        const dialogRef = this.openDialogAndListenForClose();
        dialogRef.afterClosed().subscribe(res => {
            if (res === "Cancel" || res === undefined) return;
            this.item.Banned++;
            this.admindataService.banUser(this.item.User_ID).subscribe();
        });
    }

    handleDialogResponse(res: string): void {
        console.log("A");
    }

    setUndoTimer(): void {
        this.undoTimer = setTimeout(() => {
            // Ban/Warn user.
            // this.admindataService.deleteGame(this.item.GameID).subscribe();
        }, 4000);
    }
}
