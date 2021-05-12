import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // activeButton:any = "games";

  constructor() { }

  ngOnInit(): void {
    
  }

  // getButton():any{
  //   return this.activeButton;
  // }

  // setButton(newButton:any){
  //   this.activeButton = newButton;
  // }

}
