import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Admindata} from '../admindata';
import {AdmindataService} from '../admindata.service';

@Component({
    selector: 'app-reporteduser',
    templateUrl: './reporteduser.component.html',
    styleUrls: ['./reporteduser.component.css'],
})
export class ReporteduserComponent extends Admindata implements OnInit {
    constructor(public datepipe: DatePipe, public admindataService: AdmindataService) {
        super(datepipe, admindataService);
    }

    ngOnInit(): void {
    }

    getData(): void {
        this.admindataService.getReportedUsers().subscribe(response => {
            this.fillDataWithDateTime(response);
            this.allowViewToLoad(['Date', 'Time', 'Username', 'Reason']);
        });
    }
}
