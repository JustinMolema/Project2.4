import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-tabledata',
    templateUrl: './tabledata.component.html',
    styleUrls: ['./tabledata.component.css']
})
export class TabledataComponent implements OnInit {
    @Input() key: string;
    @Input() data;

    constructor() { }

    ngOnInit(): void {
    }

}
