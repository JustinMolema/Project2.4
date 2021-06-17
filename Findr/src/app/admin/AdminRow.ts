import {DatePipe} from '@angular/common';
import {AdmindataService} from './admindata.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from '../sharedmodule/dialog/dialog.component';
import {Input} from '@angular/core';

export abstract class AdminRow {
    item;
    undoTimer;
    abstract setUndoTimer(): void;

    protected constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public admindataService: AdmindataService) {
    }

    openDialogAndListenForClose(): MatDialogRef<any> {
        this.snackBar.dismiss();
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '300px',
        });

        dialogRef.afterClosed().subscribe(res =>  this.handleDialogResponse(res));

        return dialogRef;
    }

    handleDialogResponse(res: string): void {
        if (res === "Cancel" || res === undefined) return;

        this.admindataService.deleteItem(this.item);
        this.setUndoTimer();

        const snackbarRef = this.snackBar.open('Item deleted', 'undo');
        snackbarRef.afterDismissed().subscribe(snack => this.handleSnackBarResponse(snack));
    }

    handleSnackBarResponse(res): void {
        if (!res.dismissedByAction) return;

        clearTimeout(this.undoTimer);
        setTimeout(() => this.admindataService.undoDeleteItem(), 0);
    }
}
