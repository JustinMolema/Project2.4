import { DatePipe, formatDate } from '@angular/common';
import { Directive, Input, SimpleChanges, Renderer2, ElementRef, OnChanges } from '@angular/core';

@Directive({
    selector: '[appHightlightSearch]'
})
export class HightlightSearchDirective {
    @Input() searchedWord: string;
    @Input() content: any;

    constructor(private el: ElementRef, private renderer: Renderer2, public datepipe: DatePipe) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.content) return;

        this.setHighlights();
    }

    setHighlights() {
        this.renderer.setProperty(this.el.nativeElement.children[0].children[0].children[0], 'innerHTML', this.getFormattedText("date"));
        this.renderer.setProperty(this.el.nativeElement.children[0].children[2].children[0], 'innerHTML', this.getFormattedText("name"));
        this.renderer.setProperty(this.el.nativeElement.children[0].children[3].children[0], 'innerHTML', this.getFormattedText("reason"));
    }

    getFormattedText(key: string) {
        const re = new RegExp(`(${this.searchedWord})`, 'gi');
        return this.content[key].replace(re, `<b style="background: rgb(63, 63, 119);">$1</b>`);
    }
}
