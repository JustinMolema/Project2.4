import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-chatmessage',
    templateUrl: './chatmessage.component.html',
    styleUrls: ['./chatmessage.component.css']
})
export class ChatmessageComponent implements OnInit {

  // @Input() received: boolean;
  @Input() message;
  // @Input() userName: string;

    constructor() {
    }

    ngOnInit(): void {
        console.log(this.message);
    }
}
