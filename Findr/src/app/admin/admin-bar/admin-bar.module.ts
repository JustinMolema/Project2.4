import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminBarComponent } from './admin-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AdminBarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [AdminBarComponent]
})

export class AdminBarModule { }
