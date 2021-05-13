import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-reporteduser',
    templateUrl: './reporteduser.component.html',
    styleUrls: ['./reporteduser.component.css'],
})
export class ReporteduserComponent implements OnInit {
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

    reported_users = [
        { date: this.dateTime, naam: 'Harald', reason: 'e' },
        { date: new Date("December 30, 2017 11:20:25"), naam: 'Justin', reason: 'd' },
        { date: this.dateTime, naam: 'Anne Pier', reason: 'a' },
        { date: this.dateTime, naam: 'Merel', reason: 'b' },
        { date: this.dateTime, naam: 'Robbin', reason: 'c' },
        { date: this.dateTime, naam: 'Harald', reason: 'e' },
        { date: new Date("December 30, 2017 11:20:25"), naam: 'Justin', reason: 'd' },
        { date: this.dateTime, naam: 'Anne Pier', reason: 'a' },
        { date: this.dateTime, naam: 'Merel', reason: 'b' },
        { date: this.dateTime, naam: 'Robbin', reason: 'c' },
        { date: this.dateTime, naam: 'Harald', reason: 'e' },
        { date: new Date("December 30, 2017 11:20:25"), naam: 'Justin', reason: 'd' },
        { date: this.dateTime, naam: 'Anne Pier', reason: 'a' },
        { date: this.dateTime, naam: 'Merel', reason: 'b' },
        { date: this.dateTime, naam: 'Robbin', reason: 'c' },
        { date: this.dateTime, naam: 'Harald', reason: 'e' },
        { date: new Date("December 30, 2017 11:20:25"), naam: 'Justin', reason: 'd' },
        { date: this.dateTime, naam: 'Anne Pier', reason: 'a' },
        { date: this.dateTime, naam: 'Merel', reason: 'b' },
        { date: this.dateTime, naam: 'Robbin', reason: 'c' },
    ];

    constructor() { 
        this.sortByDate();
    }

    ngOnInit(): void { 
        
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

        return this.sortedByName ? this.reported_users.sort((a, b) => a.naam.localeCompare(b.naam)) : this.reported_users.reverse();
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
