import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {AdmindataService} from '../admindata.service';
import {Admindata} from '../admindata';

@Component({
  selector: 'app-assignedtickets',
  templateUrl: './assignedtickets.component.html',
  styleUrls: ['./assignedtickets.component.css']
})
export class AssignedticketsComponent extends Admindata implements OnInit {
    constructor(public datepipe: DatePipe, public admindataService: AdmindataService) {
        super(datepipe, admindataService);
    }

    ngOnInit(): void {
    }

    getData(): void {
        this.admindataService.getSupportTickets().subscribe(response => {
            this.fillDataWithDateTime(response);
            this.allowViewToLoad(['Date', 'Time', 'Category', 'Status']);
        });
    }
}
