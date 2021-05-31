import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-assignedtickets',
  templateUrl: './assignedtickets.component.html',
  styleUrls: ['./assignedtickets.component.css']
})
export class AssignedticketsComponent implements OnInit {
    searchText: string;
    dateTime = new Date();

    max:Number = 20;

    keys = [];
    tickets = [
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Robbin", status: "Failed" },
        { date: this.datepipe.transform(new Date("December 30, 2017 11:20:25"),
        'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Anne Pier", status: "Success" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Justin", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Merel", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Wijmar Nijdam", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Sietse de slang", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Jan Peter", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Robbin", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Anne Pier", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Justin", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Merel", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Wijmar Nijdam", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Sietse de slang", status: "Pending" },
    ]

    constructor(public datepipe: DatePipe) {
        this.keys = Object.keys(this.tickets[0]);
    }

    ngOnInit(): void {
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;

        this.max = this.tickets.length;

    }
}
