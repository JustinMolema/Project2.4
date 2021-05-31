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
    _actionSize = "25";
    _infoSize = "25";

    _keys = [];
    _items = [];

    constructor(public datepipe: DatePipe) {
    }

    ngOnInit(): void {
        console.log(this.keys);
    }

    ngAfterViewInit(): void {
        this.sortItems(this.keys[0].toLowerCase());
    }

    @Input()
    set items(items: any[]) {
        this._items = items;
    }

    get items() {
        return this._items;
    }

    @Input()
    set keys(keys: any[]) {
        this._keys = keys;
    }

    get keys() {
        return this._keys;
    }

    @Input()
    set actionSize(size:any){
        this._actionSize = size;
    }

    get actionSize(){
        return this._actionSize;
    }

    @Input()
    set infoSize(size:any){
        this._infoSize = size;
    }

    get infoSize(){
        return this._infoSize;
    }

    sortItems(columnName: string): any {
        if (this.alreadySortingByThisColumn(columnName)) {
            this.ascending = !this.ascending;
            return this._items.reverse();
        }

        this.ascending = true;
        this.sortingBy = columnName;

        if (this.isColumnNumeric(columnName)) this.sortByNumbers(columnName);
        else this.sortByString(columnName);

        // Sorting by date does NOT ascend the first time, so reverse the list after sorting it by date (descending default)
        // Don't remove this line thinking the first if statement can replace it.
        if (columnName == "date") this._items.reverse();
    }

    alreadySortingByThisColumn(columnName: string): boolean {
        return this.sortingBy == columnName;
    }

    isColumnNumeric(columnName: string): boolean {
        return columnName === "warning" || columnName === "subscribercount";
    }

    sortByNumbers(columnName: string): void {
        this._items.sort((a, b) => a[columnName].toString().localeCompare(b[columnName].toString(), undefined, { 'numeric': true }));
    }

    sortByString(columnName: string): void {
        this._items.sort((a, b) => a[columnName].toString().localeCompare(b[columnName].toString()));
    }
}
