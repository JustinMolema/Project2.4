import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HighlightSearchDirective} from '../admin/directives/highlight -search.directive';
import {TablefilterPipe} from '../admin/pipes/tablefilter.pipe';
import {DialogComponent} from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {A11yModule} from '@angular/cdk/a11y';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [HighlightSearchDirective, TablefilterPipe, DialogComponent],
    imports: [
        CommonModule,
        A11yModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
    ],
    exports: [HighlightSearchDirective, FormsModule, TablefilterPipe, DialogComponent],
})
export class SharedmoduleModule {
}
