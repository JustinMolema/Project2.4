import { Component, Input, OnInit } from '@angular/core';
import { AdmindataService } from '../../admindata.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    _name: String;
    _category: String;
    _subscribercount: Number;

    constructor(private admindataService: AdmindataService) { 
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
    set category(category: String) {
        this._category = category;
    }

    get category() {
        return this._category;
    }

    @Input()
    set subscribercount(subscribercount: Number) {
        this._subscribercount = subscribercount;
    }

    get subscribercount() {
        return this._subscribercount;
    }

    delete(name: string): void {
        if (confirm("Are you sure you want to delete game: " + name)) {
            alert("Item deleted");
            console.log(typeof(name))
            this.admindataService.deleteGame(name).subscribe(response => console.log(response));
        }
    }
}