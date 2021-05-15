import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-reporteduser',
    templateUrl: './reporteduser.component.html',
    styleUrls: ['./reporteduser.component.css'],
})
export class ReporteduserComponent implements OnInit {
    searchText: string;
    username = 'Username';
    offense = 'Offense';
    actions = 'Actions';
    dateTime = new Date();

    sortedByDate: boolean = false;
    sortedByName: boolean = false;
    sortedByReason: boolean = false;

    dateSorting: boolean = false;
    nameSorting: boolean = false;
    reasonSorting: boolean = false;

    max:Number;

    reported_users = [
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Harald', reason: 'Harassment' },
        { date: this.datepipe.transform(new Date("December 30, 2017 11:20:25"), 'dd MMMM yyyy'), 
        time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Justin', reason: 'q' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Anne Pier', reason: 'qa' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Merel', reason: 'b' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Robbin', reason: 'c' },
        { date: this.datepipe.transform(this.dateTime, 'dd MMMM yyyy'), time: this.datepipe.transform(this.dateTime, 'HH:mm:ss '), name: 'Harald', reason: 'e' },
    ];

    constructor(public datepipe: DatePipe) { 
        this.sortByDate();
    }

    ngOnInit(): void { 
        
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;
        
        this.max = this.reported_users.length;
    }
    
    sortByDate(): any {
        let sort = !this.sortedByDate;
        this.resetSorted();
        this.sortedByDate = sort;

        this.resetDefaultSorted();
        this.dateSorting = true;

        return this.sortedByDate ? this.reported_users.sort((a, b) => (a.date > b.date) ? 1 : (b.date > a.date) ? -1: 0) : this.reported_users.reverse();
    }

    sortByName(): any {
        let sort = !this.sortedByName;
        this.resetSorted();
        this.sortedByName = sort;

        this.resetDefaultSorted();
        this.nameSorting = true;

        return this.sortedByName ? this.reported_users.sort((a, b) => a.name.localeCompare(b.name)) : this.reported_users.reverse();
    }

    sortByReason() {    
        let sort = !this.sortedByReason;
        this.resetSorted();
        this.sortedByReason = sort;

        this.resetDefaultSorted();
        this.reasonSorting = true;

        return this.sortedByReason ? this.reported_users.sort((a, b) => a.reason.localeCompare(b.reason)) : this.reported_users.reverse();
    }

    resetSorted(): void{
        this.sortedByName = false;
        this.sortedByReason = false;
        this.sortedByDate = false;
    }

    resetDefaultSorted(): void{
        this.dateSorting = false;
        this.nameSorting = false;
        this.reasonSorting = false;
    }

}
