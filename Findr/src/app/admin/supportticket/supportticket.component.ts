import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-supportticket',
  templateUrl: './supportticket.component.html',
  styleUrls: ['./supportticket.component.css']
})
export class SupportticketComponent implements OnInit {
    tickets = [{tag: "Robbin", status: "Pending"}, {tag: "Anne Pier", status: "Pending"}, {
        tag: "Justin",
        status: "Pending"
      }, {tag: "Merel", status: "Pending"},
        {tag: "Bart barnard area 51 raider ", status: "Pending"}, {
          tag: "Wijmar Nijdam",
          status: "Pending"
        }, {tag: "Sietse de slang", status: "Pending"}, {tag: "Jan Peter", status: "Pending"}]
    
    constructor() { 

    }

    ngOnInit(): void {
    }
}
