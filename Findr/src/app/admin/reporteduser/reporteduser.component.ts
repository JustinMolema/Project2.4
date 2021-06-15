import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Admindata} from '../admindata';
import {AdmindataService} from '../admindata.service';

@Component({
    selector: 'app-reporteduser',
    templateUrl: './reporteduser.component.html',
    styleUrls: ['./reporteduser.component.css'],
})
export class ReporteduserComponent implements OnInit, Admindata {
    searchText: string;
    isLoaded: boolean;
    addingNewGame = false;
    max: number;

    keys = [];
    reportedUsers = [];


// {
//     date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'),
//     time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '),
//     name: 'Harald',
//     reason: 'Harassment'
// },
    constructor(public datepipe: DatePipe, private admindataService: AdmindataService) {
        this.getData();
        // this.isLoaded = false;
    }

    ngOnInit(): void {
    }

    changeEvent(max: number): number {
        if (max > 1) return this.max = max;
        this.max = this.reportedUsers.length;
    }

    getData(): void {
        this.admindataService.getReportedUsers().subscribe(response => {
            this.fillData(response);
            this.allowViewToLoad();
        });
    }

    fillData(response: any): void {
        for (const user of response) {
            const date = new Date(user.Date);
            user.Date = this.datepipe.transform(date, 'dd MMMM yyyy');
            user.Time = this.datepipe.transform(date, 'HH:mm:ss ');
            this.reportedUsers.push(user);
        }
    }

    allowViewToLoad(): void {
        this.keys = ['Date', 'Time', 'Username', 'Reason'];
        this.isLoaded = true;
    }
}
