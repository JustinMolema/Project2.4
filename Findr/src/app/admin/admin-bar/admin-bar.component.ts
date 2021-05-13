import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.css']
})
export class AdminBarComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {
      this.renderer.addClass(document.body, 'adminBody');
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'adminBody');
  }
}