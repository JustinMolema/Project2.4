import { Component, Input, OnInit } from '@angular/core';
import {AdminRow} from '../../AdminRow';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {AdmindataService} from '../../admindata.service';

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

    setUndoTimer(): void {
        this.undoTimer = setTimeout(() => {
            // Ban/Warn user.
            // this.admindataService.deleteGame(this.item.GameID).subscribe();
        }, 4000);
    }
}
