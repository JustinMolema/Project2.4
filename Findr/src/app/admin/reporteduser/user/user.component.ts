import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../sharedmodule/dialog/dialog.component';
import {AdmindataService} from '../../admindata.service';
import {AdminRow} from '../../AdminRow';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent extends AdminRow implements OnInit {
    @Input() item;

    constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public admindataService: AdmindataService) {
        super(snackBar, dialog, admindataService);
    }

    ngOnInit(): void {
    }

    setUndoTimer(): void {
        this.undoTimer = setTimeout(() => {
            this.admindataService.deleteReportedUser(this.item.ReportedUserID).subscribe();
        }, 4000);
    }
}
