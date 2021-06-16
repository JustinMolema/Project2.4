import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Admindata} from '../admindata';
import {AdmindataService} from '../admindata.service';

@Component({
    selector: 'app-supportticket',
    templateUrl: './supportticket.component.html',
    styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent extends Admindata implements OnInit {

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
