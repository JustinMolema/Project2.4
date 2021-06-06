import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'all-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    _name: String;
    _email: String;
    _warning: Number;
    _ban: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    @Input()
    set name(name: String) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    @Input()
    set email(email: String) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    @Input()
    set warning(warning: Number) {
        this._warning = warning;
    }

    get warning() {
        return this._warning;
    }

    @Input()
    set ban(ban: string) {
        this._ban = ban;
    }

    get ban() {
        return this._ban;
    }

    delete(name: String, offense: String): void {
        if (confirm("Are you sure you want to delete this: Name: " + name + " Offense: " + offense)) {
            alert("Item deleted");
        }
    }
}
