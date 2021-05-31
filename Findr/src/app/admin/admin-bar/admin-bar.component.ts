import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-admin-bar',
    templateUrl: './admin-bar.component.html',
    styleUrls: ['./admin-bar.component.css'],
    animations: [
        trigger('show', [
            state('left', style({ 'width': '0px' , 'padding': '0', 'color': 'black'})),
            state('right', style({ 'width': '185px' })),
            transition('right => left', [
                animate(2000)
            ]),
            transition('left => right', [
                animate(0)
            ]),
        ]),
        trigger('state', [
            state('left', style({ 'color': 'black'})),
            state('right', style({ 'width': '185px' })),
            transition('right => left', [
                animate(300)
            ]),
            transition('left => right', [
                animate(0)
            ]),
        ]),
    ]
})
export class AdminBarComponent implements OnInit, OnDestroy {
    state: string = "right";
    constructor(private renderer: Renderer2) {
        this.renderer.addClass(document.body, 'adminBody');
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'adminBody');
    }

    collapse(): void {

    }

    kermit() {
        console.log("dfsdf");
        this.state = "left";
    }

    thirdCardFlipped() {
        this.state = "right";
    }

    startTimer() {
        this.state = "left";
    }
}
