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
        { name: 'a', email: 'HaraldThelegend@hotmail.com', warning: 2, ban: "No" },
        { name: 'c', email: 'HaraldThelegend@hotmail.com', warning: 1, ban: "No" },
        { name: 'b', email: 'HaraldThelegend@hotmail.com', warning: 3, ban: "Yes" },
        { name: 'Harald', email: 'HaraldThelegend@hotmail.com', warning: 5, ban: "Yes" },
        { name: 'Harald', email: 'HaraldThelegend@hotmail.com', warning: 8, ban: "Yes" },
        { name: 'e', email: 'HaraldThelegend@hotmail.com', warning: 3, ban: "Yes" },
        { name: 'Harald', email: 'HaraldThelegend@hotmail.com', warning: 0, ban: "Yes" },
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
