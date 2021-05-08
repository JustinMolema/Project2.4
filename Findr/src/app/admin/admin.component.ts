import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    tickets = [{tag: "Robbin", status: "Pending"}, {tag: "Anne Pier", status: "Pending"}, {tag: "Justin", status: "Pending"}, {tag: "Merel", status: "Pending"},
    {tag: "Bart barnard area 51 raider ", status: "Pending"}, {tag: "Wijmar Nijdam", status: "Pending"}, {tag: "Sietse de slang", status: "Pending"}, {tag: "Jan Peter", status: "Pending"}]

  constructor() { }

  ngOnInit(): void {
    // this.tickets = Array(10).fill();
  }

}
