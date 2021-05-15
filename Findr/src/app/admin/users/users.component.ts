import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    searchText: string;
    
    sortedByName: boolean = false;
    sortedByEmail: boolean = false;
    sortedByWarning: boolean = false;
    sortedByBan: boolean = false;

    nameSorting: boolean = false;
    emailSorting: boolean = false;
    warningSorting: boolean = false;
    banSorting: boolean = false;

    max: Number;

    keys = [];
    users = [
        { name: 'Harald', email: 'HaraldThelegend@hotmail.com', warning: 1, ban: "Yes" },
        { name: 'Justin', email: 'noobmaster420@gamur.com', warning: 100, ban: "No"},
        { name: 'Anne Pier', email: 'GilfHunter69@lindanoordhuis.com', warning: 7, ban: "Yes please"},
        { name: 'Merel', email: 'Vogel@nitroflex.com', warning: 3, ban: "No" },
        { name: 'Robbin', email: 'Robbin@rooieraket.com', warning: 4, ban: "No" },
        { name: 'Bart', email: 'BartBarnard@area51raider.com', warning: 2, ban: "No" },
    ];
    constructor() {
        this.keys = Object.keys(this.users[0]);
    }

    ngOnInit(): void {
    }

    changeEvent(max: Number) {
        if (max > 1) return this.max = max;

        this.max = this.users.length;
    }

    sortByName(): any {
        let sort = !this.sortedByName;
        this.resetSorted();
        this.sortedByName = sort;

        this.resetDefaultSorted();
        this.nameSorting = true;

        return this.sortedByName ? this.users.sort((a, b) => a.name.localeCompare(b.name)) : this.users.reverse();
    }

    sortByEmail() {
        let sort = !this.sortedByEmail;
        this.resetSorted();
        this.sortedByEmail = sort;

        this.resetDefaultSorted();
        this.emailSorting = true;

        return this.sortedByEmail ? this.users.sort((a, b) => a.email.localeCompare(b.email)) : this.users.reverse();
    }

    sortByWarning() {
        let sort = !this.sortedByWarning;
        this.resetSorted();
        this.sortedByWarning = sort;

        this.resetDefaultSorted();
        this.warningSorting = true;

        return this.sortedByWarning ? this.users.sort((a, b) => (a.warning > b.warning) ? 1 :
            (b.warning > a.warning) ? -1 : 0) : this.users.reverse();
    }

    
    sortByBan() {
        let sort = !this.sortedByBan;
        this.resetSorted();
        this.sortedByBan = sort;

        this.resetDefaultSorted();
        this.banSorting = true;

        return this.sortedByBan ? this.users.sort((a, b) => a.ban.localeCompare(b.ban)) : this.users.reverse();
    }


    resetSorted(): void {
        this.sortedByName = false;
        this.sortedByEmail = false;
        this.sortedByWarning = false;
        this.sortedByBan = false;
    }

    resetDefaultSorted(): void {
        this.nameSorting = false;
        this.emailSorting = false;
        this.warningSorting = false;
        this.banSorting = false;
    }
}
