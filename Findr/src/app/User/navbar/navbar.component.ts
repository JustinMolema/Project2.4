import { Component, OnInit } from '@angular/core';
import {TopbarService} from '../topbar/topbar.service';
import {AppService} from 'src/app/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  topbar: TopbarService;

  constructor(private topbarService: TopbarService, private appService: AppService) {
    this.topbar = topbarService;
  }

  ngOnInit(): void {
      this.appService.applicationInitialAPICalls();
  }
}
