import {Injectable} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {AdminBarComponent} from "./admin-bar.component";
@Injectable({
    providedIn: 'root',
})

export class AdminBarService {
    navbar: AdminBarComponent;
    constructor() {
    }

    setNavbarComponent (component: AdminBarComponent){
        this.navbar = component;
    }

    collapse(): void {
        this.navbar.collapse();
    }
}
