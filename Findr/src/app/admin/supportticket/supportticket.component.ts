import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'app-supportticket',
    templateUrl: './supportticket.component.html',
    styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit {
    searchText: string;
    dateTime = new Date();


    sortedByDate: boolean = false;
    sortedByTag: boolean = false;
    sortedByStatus: boolean = false;

    dateSorting: boolean = false;
    tagSorting: boolean = false;
    statusSorting: boolean = false;

    max:Number = 20;

    tickets = [
        { date: this.dateTime, tag: "Robbin", status: "Failed" },
        { date: new Date("December 30, 2017 11:20:25"), tag: "Anne Pier", status: "Success" },
        { date: this.dateTime, tag: "Justin", status: "Pending" },
        { date: this.dateTime, tag: "Merel", status: "Pending" },
        { date: this.dateTime, tag: "Bart barnard area 51 raider ", status: "Pending" },
        { date: this.dateTime, tag: "Wijmar Nijdam", status: "Pending" },
        { date: this.dateTime, tag: "Sietse de slang", status: "Pending" },
        { date: this.dateTime, tag: "Jan Peter", status: "Pending" },
        { date: this.dateTime, tag: "Robbin", status: "Pending" },
        { date: this.dateTime, tag: "Anne Pier", status: "Pending" },
        { date: this.dateTime, tag: "Justin", status: "Pending" },
        { date: this.dateTime, tag: "Merel", status: "Pending" },
        { date: this.dateTime, tag: "Bart barnard area 51 raider ", status: "Pending" },
        { date: this.dateTime, tag: "Wijmar Nijdam", status: "Pending" },
        { date: this.dateTime, tag: "Sietse de slang", status: "Pending" },
    ]

    constructor() {

    }

    ngOnInit(): void {
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;
        
        this.max = this.tickets.length;
        
    }

    
    sortByDate(): any {
        let sort = !this.sortedByDate;
        this.resetSorted();
        this.sortedByDate = sort;

        this.resetDefaultSorted();
        this.dateSorting = true;

        return this.sortedByDate ? this.tickets.sort((a, b) => (a.date > b.date) ? 1 : (b.date > a.date) ? -1 : 0) : this.tickets.reverse();
    }

    sortByTag(): any {
        let sort = !this.sortedByTag;
        this.resetSorted();
        this.sortedByTag = sort;

        this.resetDefaultSorted();
        this.tagSorting = true;

        return this.sortedByTag ? this.tickets.sort((a, b) => a.tag.localeCompare(b.tag)) : this.tickets.reverse();
    }

    sortByStatus() {
        let sort = !this.sortedByStatus;
        this.resetSorted();
        this.sortedByStatus = sort;

        this.resetDefaultSorted();
        this.statusSorting = true;

        return this.sortedByStatus ? this.tickets.sort((a, b) => a.status.localeCompare(b.status)) : this.tickets.reverse();
    }

    resetSorted(): void {
        this.sortedByTag = false;
        this.sortedByStatus = false;
        this.sortedByDate = false;
    }

    resetDefaultSorted(): void {
        this.dateSorting = false;
        this.tagSorting = false;
        this.statusSorting = false;
    }
}
