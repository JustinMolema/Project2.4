import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {animate, animateChild, group, query, stagger, state, style, transition, trigger} from '@angular/animations';
import {AdminBarService} from "./admin-bar.service";
import {delay} from "rxjs/operators";

@Component({
    selector: 'app-admin-bar',
    templateUrl: './admin-bar.component.html',
    styleUrls: ['./admin-bar.component.css'],
    animations: [
        trigger('show', [
            state('left', style({'width': '0px', 'padding': '0'})),
            state('right', style({'width': '250px'})),
            transition('right => left', [
                group([
                    query('@showchild', animateChild()),
                    animate(200),
                ]),
            ]),
            transition('left => right', [
                group([
                    query("@showchild", [
                        stagger(175, [
                            animateChild()
                        ])
                    ]),
                    // query('@showchild', animateChild()),
                    animate(200),
                ]),
            ]),
        ]),
        trigger('showchild', [
            state('left', style({'opacity': '0'})),
            state('right', style({'opacity': '1'})),
            transition('right => left', [
                animate(15)
            ]),
            transition('left => right', [
                animate(15)
            ]),
        ]),
    ]
})
export class AdminBarComponent implements OnInit, OnDestroy {
    state: string = "right";

    constructor(private renderer: Renderer2, private adminbarService: AdminBarService) {
        this.renderer.addClass(document.body, 'adminBody');
        this.adminbarService.setNavbarComponent(this);
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(document.body, 'adminBody');
    }

    collapse(): void {
        this.state = this.state === "left" ? "right" : "left";
    }
}
