import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    _name: String;
    _offense: String;
    _date: Date;
    _time: Date;

    constructor() { }

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
    set offense(offense: String) {
        this._offense = offense;
    }

    get offense() {
        return this._offense;
    }

    @Input()
    set date(date: Date) {
        this._date = date;
    }

    get date() {
        return this._date;
    }

    @Input()
    set time(time: Date) {
        this._time = time;
    }

    get time() {
        return this._time;
    }

    delete(name: String, offense: String): void {
        if (confirm("Are you sure you want to delete this: Name: " + name + " Offense: " + offense)) {
            alert("Item deleted");
        }

    }



}