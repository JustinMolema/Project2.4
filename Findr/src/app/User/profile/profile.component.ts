import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {sanitize} from "../../sharedmodule/global.findr.methods";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    usernameIsEditable = false;
    reader = new FileReader();

    dbPicture: any;
    user: any;
    email: any;
    warningCount: any;

    constructor(private appService: AppService) {
    }

    // Grab and store user information
    ngOnInit(): void {
        this.appService.getProfile().subscribe(res => {
            this.user = res[0].Username;
            this.email = decodeURIComponent(res[0].Email);
            this.warningCount = res[0].Warnings;
            this.dbPicture = sanitize(decodeURIComponent(res[0].Profile_picture));
        });
    }

    // To change input field to allow username change
    onEdit(): void {
        if (this.usernameIsEditable) {
            this.submitNewUserName();
        }
        this.usernameIsEditable = !this.usernameIsEditable;
    }

    // Send username update to the server
    submitNewUserName(): void {
        this.appService.changeUsername(this.user).subscribe();
    }

    // Prepare file for upload in server.
    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];

        this.reader.readAsDataURL(file);

        // this.hasFileBeenSelected = true;

        this.reader.onload = () => {
            this.dbPicture = sanitize(this.reader.result.toString());
            this.appService.changeProfilePicture(this.reader.result).subscribe();
        };
    }
}
