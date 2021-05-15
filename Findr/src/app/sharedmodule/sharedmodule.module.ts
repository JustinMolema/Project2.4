import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighlightSearchDirective } from '../admin/directives/highlight -search.directive';
import { TablefilterPipe } from '../admin/pipes/tablefilter.pipe';

@NgModule({
  declarations: [HighlightSearchDirective, TablefilterPipe],
  imports: [
    CommonModule
  ],
  exports: [HighlightSearchDirective, FormsModule, TablefilterPipe],
})
export class SharedmoduleModule { }
