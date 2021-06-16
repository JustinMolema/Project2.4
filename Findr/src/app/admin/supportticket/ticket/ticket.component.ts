import { Component, OnInit, Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {AdmindataService} from '../../admindata.service';
import {DialogComponent} from '../../../sharedmodule/dialog/dialog.component';
import {AdminRow} from '../../AdminRow';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent extends AdminRow implements OnInit {
    @Input() item;

    constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public admindataService: AdmindataService) {
        super(snackBar, dialog, admindataService);
    }

    ngOnInit(): void {
        console.log(this.item);
    }

    setUndoTimer(): void {
        this.undoTimer = setTimeout(() => {
            this.admindataService.deleteSupportTicket(this.item.TicketID).subscribe();
        }, 4000);
    }
}
