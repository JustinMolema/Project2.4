import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
    searchText: string;
    name = 'name';
    category = 'category';
    subscribercount = 'subscribercount';

    sortedByName: boolean = false;
    sortedByCategory: boolean = false;
    sortedBySubscribercount: boolean = false;

    nameSorting: boolean = false;
    categorySorting: boolean = false;
    subscribercountSorting: boolean = false;

    max: Number;

    keys = [];
    games = [
        { name: 'Harald', category: 'Harassment', subscribercount: 1 },
        { name: 'Justin', category: 'q', subscribercount: 100 },
        { name: 'Anne Pier', category: 'qa', subscribercount: 7 },
        { name: 'Merel', category: 'b', subscribercount: 3 },
        { name: 'Robbin', category: 'c', subscribercount: 4 },
        { name: 'Harald', category: 'e', subscribercount: 2 },
    ];
    constructor() {
        this.keys = Object.keys(this.games[0]);
    }

    ngOnInit(): void {
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;

        this.max = this.games.length;
    }

    sortByName(): any {
        let sort = !this.sortedByName;
        this.resetSorted();
        this.sortedByName = sort;

        this.resetDefaultSorted();
        this.nameSorting = true;

        return this.sortedByName ? this.games.sort((a, b) => a.name.localeCompare(b.name)) : this.games.reverse();
    }

    sortByCategory() {
        let sort = !this.sortedByCategory;
        this.resetSorted();
        this.sortedByCategory = sort;

        this.resetDefaultSorted();
        this.categorySorting = true;

        return this.sortedByCategory ? this.games.sort((a, b) => a.category.localeCompare(b.category)) : this.games.reverse();
    }

    sortBySubscribercount() {
        let sort = !this.sortedBySubscribercount;
        this.resetSorted();
        this.sortedBySubscribercount = sort;

        this.resetDefaultSorted();
        this.subscribercountSorting = true;

        return this.sortedBySubscribercount ? this.games.sort((a, b) => (a.subscribercount > b.subscribercount) ? 1 :
            (b.subscribercount > a.subscribercount) ? -1 : 0) : this.games.reverse();
    }

    resetSorted(): void {
        this.sortedByName = false;
        this.sortedByCategory = false;
        this.sortedBySubscribercount = false;
    }

    resetDefaultSorted(): void {
        this.nameSorting = false;
        this.categorySorting = false;
        this.subscribercountSorting = false;
    }
}
