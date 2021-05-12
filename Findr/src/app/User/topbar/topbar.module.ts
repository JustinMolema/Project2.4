import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar.component';



@NgModule({
  declarations: [
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports:[
      TopbarComponent,
  ]
})
export class TopbarModule { }
