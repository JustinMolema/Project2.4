import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from 'src/app/app.service';

@Component({
    selector: 'app-blockedusers',
    templateUrl: './blockedusers.component.html',
    styleUrls: ['./blockedusers.component.css']
})
export class BlockedusersComponent implements OnInit {
    @Input() user: string;
    @Input() userID: string;
    @Input() pic;

    @Output()
    refresh: EventEmitter<string> = new EventEmitter<string>();

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
    }

    unblock(): void {
        this.appService.unblockUser(this.user).subscribe(res => {
            this.refresh.emit('hoi');
        });
    }
}
