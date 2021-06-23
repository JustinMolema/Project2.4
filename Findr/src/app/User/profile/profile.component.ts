import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    // Username input field
    isEditEnable = false;

    // Profile picture
    hasFileBeenSelected = false;
    reader = new FileReader();

    // Variables to store user information in
    dbPicture: any;
    username: any;
    email: any;
    warningCount: any;

    constructor(private appService: AppService, private sanitiser: DomSanitizer) {
    }

    // Grab and store user information
    ngOnInit(): void {
        const user = this.appService.user;
        this.username = user.Username;
        this.email = decodeURIComponent(user.Email);
        this.warningCount = user.Warnings;
        if (user.Profile_picture) {
            this.dbPicture = this.sanitize(decodeURIComponent(user.Profile_picture));
            this.hasFileBeenSelected = true;
        }
    }

    // To change input field to allow username change
    onEdit(): void {
        if (this.isEditEnable) {
            this.submitNewUserName();
        }
        this.isEditEnable = !this.isEditEnable;
    }

    // Send username update to the server
    submitNewUserName(): void {
        this.appService.changeUsername(this.username).subscribe();
    }

    // Prepare file for upload in server.
    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];

        this.reader.readAsDataURL(file);

        this.hasFileBeenSelected = true;

        this.reader.onload = () => {
            this.dbPicture = this.sanitize(this.reader.result.toString());
            this.appService.changeProfilePicture(this.reader.result).subscribe();
        };
    }

    // Allow retrieved URL to be displayed on page
    sanitize(url: string): SafeResourceUrl {
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }
}
