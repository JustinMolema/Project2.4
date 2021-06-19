import {DatePipe} from '@angular/common';
import {AdmindataService} from './admindata.service';

export abstract class Admindata {
    searchText: string;
    isLoaded: boolean;
    max: number;

    keys = [];
    items = [];
    itemsHolderAfterDelete = [];

    constructor(public datepipe: DatePipe, public admindataService: AdmindataService) {
        this.getData();
        this.admindataService.deleteItemListener().subscribe(item => this.deleteItem(item));
        this.admindataService.undoDeleteItemListener().subscribe(() => this.undoDeleteItem());
    }

    abstract getData(): void;

    fillData(response: any): void {
        for (const item of response) {
            if (item.Email) item.Email = decodeURIComponent(item.Email);
            this.items.push(item);
        }
    }

    fillDataWithDateTime(response: any): void {
        for (const item of response) {
            const date = new Date(item.Date);
            item.Date = this.datepipe.transform(date, 'dd MMMM yyyy');
            item.Time = this.datepipe.transform(date, 'HH:mm:ss ');
            this.items.push(item);
        }
    }

    allowViewToLoad(keys): void {
        this.keys = keys;
        this.isLoaded = true;
    }

    deleteItem(item): void {
        Object.assign(this.itemsHolderAfterDelete, this.items);
        this.items = this.items.filter(obj => obj !== item);
    }

    undoDeleteItem(): void {
        Object.assign(this.items, this.itemsHolderAfterDelete);
    }

    changeEvent(max: number): number {
        if (max > 1) return this.max = max;
        this.max = this.items.length;
    }
}
