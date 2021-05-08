import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    tickets = [{tag: "Robbin", status: "pending"}, {tag: "Robbin", status: "pending"}, {tag: "Robbin", status: "pending"}, {tag: "Robbin", status: "pending"}]

  constructor() { }

  ngOnInit(): void {
    // this.tickets = Array(10).fill();
  }

}
