import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../../sharedmodule/dialog/dialog.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    @Input() name: string;
    @Input() offense: string;
    @Input() date: Date;
    @Input() time: Date;

    constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
    }

    ngOnInit(): void {

    }

    openDialogAndListenForClose(name: string, offense: string): void {
        this.snackBar.dismiss();
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe(res => {
            this.handleDialogResponse(res);
        });
    }

    handleDialogResponse(res: string): void {
        if (res === "Cancel" || res === undefined) return;

        // TODO Delete item from database and list.
        this.snackBar.open('Item deleted', 'undo');
    }
}
