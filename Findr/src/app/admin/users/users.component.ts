import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    searchText: string;

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
}
