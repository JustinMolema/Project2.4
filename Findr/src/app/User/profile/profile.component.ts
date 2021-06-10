import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    // Username input field
    isEditEnable: boolean = false;

    // Profile picture
    hasFileBeenSelected = false;
    reader = new FileReader();

    // Variables to store user information in
    dbPicture: any;
    user: any;
    email: any;
    warningCount: any;

    constructor(private appService: AppService, private sanitiser: DomSanitizer) {
    }

    // Grab and store user information
    ngOnInit(): void {
        this.appService.getProfile(this.appService.storedUserID).subscribe(res => {
            this.user = res[0].Username;
            this.email = decodeURIComponent(res[0].Email);
            this.warningCount = res[0].Warnings;
            this.dbPicture = this.sanitize(decodeURIComponent(res[0].Profile_picture));
            if (this.dbPicture !== null) {
                this.hasFileBeenSelected = true;
            }
        });
    }

    // To change input field to allow username change
    onEdit() {
        if (this.isEditEnable) {
            this.submitNewUserName();
        }
        this.isEditEnable = !this.isEditEnable;
    }

    // Send username update to the server
    submitNewUserName() {
        this.appService.changeUsername(this.appService.storedUserID, this.user)
    }

    // Prepare file for upload in server.
    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];

        this.reader.readAsDataURL(file);

        this.hasFileBeenSelected = true;

        this.reader.onload = () => {
            this.appService.changeProfilePicture(this.appService.storedUserID, this.reader.result).subscribe(res => {
                console.log("Profile Pic Changed")
                this.dbPicture = this.reader.result
                console.log(res)
            }, error => {
                console.log("Profile Pic err")
                console.log(error)
            })
        }
    }

    // allow retrieved URL to get displayed on page
    sanitize(url: string) {
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }

    
}
