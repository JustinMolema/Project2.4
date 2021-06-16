import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { logWarnings } from 'protractor/built/driverProviders';

@Component({
    selector: 'app-tableheader',
    templateUrl: './tableheader.component.html',
    styleUrls: ['./tableheader.component.css']
})
export class TableheaderComponent implements OnInit, AfterViewInit {
    ascending = true;
    sortingBy = "";
    @Input() actionSize = "25";
    @Input() infoSize = "25";

    @Input() keys = [];
    @Input() items = [];

    constructor(public datepipe: DatePipe) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.sortItems(this.keys[0]);
    }

    sortItems(columnName: string): any {
        if (this.alreadySortingByThisColumn(columnName)) {
            this.ascending = !this.ascending;
            return this.items.reverse();
        }

        this.ascending = true;
        this.sortingBy = columnName;

        if (this.isColumnNumeric(columnName)) this.sortByNumbers(columnName);
        else this.sortByString(columnName);

        // Don't remove this line thinking the first if statement can replace it.
        // Sorting by date does NOT ascend the first time, so reverse the list after sorting it by date (descending default)
        if (columnName === "Date") this.items.reverse();
    }

    alreadySortingByThisColumn(columnName: string): boolean {
        return this.sortingBy === columnName;
    }

    isColumnNumeric(columnName: string): boolean {
        return columnName === "Warning" || columnName === "Subscribercount";
    }

    sortByNumbers(columnName: string): void {
        this.items.sort((a, b) => a[columnName].toString().localeCompare(b[columnName].toString(), undefined, { 'numeric': true }));
    }

    sortByString(columnName: string): void {
        this.items.sort((a, b) => a[columnName].toString().localeCompare(b[columnName].toString()));
    }
}
