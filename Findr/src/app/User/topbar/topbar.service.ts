import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TopbarService {

  collapseNavbar: boolean = false;

  constructor() { }

  altCollapseNavBar(){
      return this.collapseNavbar = !this.collapseNavbar;
  }
}
