import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder, private appService: AppService) {
        this.createForm();
    }

    createForm(): void {
        this.form = this.fb.group({
            description: ['', Validators.required],
            category: ['', Validators.required],
        });
    }

    ngOnInit(): void {
    }

    sendSupportTicket(): void{
        const val = this.form.value;
        this.appService.createSupportTicket(val.category, val.description).subscribe();
    }


}
