import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {Admindata} from '../admindata';


@Component({
    selector: 'app-supportticket',
    templateUrl: './supportticket.component.html',
    styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit, Admindata {
    searchText: string;
    dateTime = new Date();
    isLoaded: boolean;
    max = 20;

    keys = [];
    tickets = [
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Robbin", status: "Failed" },
        { date: this.datepipe.transform(new Date("December 30, 2017 11:20:25"),
        'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Anne Pier", status: "Success" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Justin", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Merel", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Bart barnard area 51 raider ", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Wijmar Nijdam", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Sietse de slang", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Jan Peter", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Robbin", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Anne Pier", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Justin", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Merel", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Bart barnard area 51 raider ", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Wijmar Nijdam", status: "Pending" },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), tag: "Sietse de slang", status: "Pending" },
    ];

    constructor(public datepipe: DatePipe) {
        this.keys = Object.keys(this.tickets[0]);
        // this.getData();
        this.isLoaded = true;
    }

    ngOnInit(): void {
    }

    changeEvent(max: number): number {
        if (max > 1) return this.max = max;

        this.max = this.tickets.length;
    }

    getData(): void {
    }

    fillData(response: any): void {
        for (let ticket of response) {
            this.tickets.push(ticket);
        }
    }

    allowViewToLoad(): void {
        this.keys = ['Date', 'Time', 'Username', 'Status'];
        this.isLoaded = true;
    }
}
