import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporteduser',
  templateUrl: './reporteduser.component.html',
  styleUrls: ['./reporteduser.component.css']
})
export class ReporteduserComponent implements OnInit {
    reported_users = [{naam: "Harald", reason: "harassment"}, {naam: "Justin", reason: "harassment"},
    {naam: "Anne Pier", reason: "bullying"}, {naam: "Merel", reason: "harassment"},
    {naam: "Robbin", reason: "harassment"}, {naam: "Wijmar", reason: "too cool"}]

  constructor() { }

  ngOnInit(): void {
  }

}
