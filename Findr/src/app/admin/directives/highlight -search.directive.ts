import { DatePipe, formatDate } from '@angular/common';
import { Directive, Input, SimpleChanges, Renderer2, ElementRef, OnChanges } from '@angular/core';

@Directive({
    selector: '[appHighlightSearch]'
})
export class HighlightSearchDirective {
    @Input() searchedWord: string;
    @Input() content: any;
    @Input() keys: [];
    skip = ['subscribercount', 'time', 'GameID', 'Image'];

    constructor(private el: ElementRef, private renderer: Renderer2, public datepipe: DatePipe) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.content) return;
        this.setHighlights();
    }

    setHighlights(): void {
        for (let i = 0; i < this.keys.length; i++) {
            if (this.skip.includes(this.keys[i])) continue;
            this.renderer.setProperty(this.el.nativeElement.children[0].children[i].children[0].children[0],
                'innerHTML', this.getFormattedText(this.keys[i]));
        }
    }

    getFormattedText(key: string): string {
        const re = new RegExp(`(${this.searchedWord})`, 'gi');
        return this.content[key].toString().replace(re, `<b style="background: rgb(63, 63, 119);">$1</b>`);
    }
}
