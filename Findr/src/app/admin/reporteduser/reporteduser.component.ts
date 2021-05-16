import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-reporteduser',
    templateUrl: './reporteduser.component.html',
    styleUrls: ['./reporteduser.component.css'],
})
export class ReporteduserComponent implements OnInit {
    searchText: string;
    dateTime = new Date();

    max:Number;

    keys = [];
    reported_users = [
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Harald', reason: 'Harassment' },
        { date: this.datepipe.transform(new Date("December 30, 2017 11:20:25"), 'dd MMMM yyyy'), 
        time: this.datepipe.transform(new Date("December 30, 2017 11:20:25"), 'HH:mm:ss '), name: 'Justin', reason: 'q' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Anne Pier', reason: 'qa' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Merel', reason: 'b' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Robbin', reason: 'c' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Harald', reason: 'e' },
    ];

    constructor(public datepipe: DatePipe) { 
        this.keys = Object.keys(this.reported_users[0]);
    }

    ngOnInit(): void { 
        
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;
        
        this.max = this.reported_users.length;
    }
}
