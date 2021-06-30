import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {globalFindrMethods} from "../../sharedmodule/global.findr.methods";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    usernameIsEditable = false;
    reader = new FileReader();

    dbPicture: any;
    username: any;
    email: any;
    warningCount: any;

    constructor(private appService: AppService, private findrMethods: globalFindrMethods) {
    }

    // Grab and store user information
    ngOnInit(): void {
        var user = this.appService.user;
        if (!user) {
            this.appService.getProfile().subscribe(() =>{
                user = this.appService.user;
                this.setDetails(user)
            })
        }
        this.setDetails(user)
    }

    setDetails(user): void{
        this.username = user.Username;
        this.email = decodeURIComponent(user.Email);
        this.warningCount = user.Warnings;
        if (user.Profile_picture) {
            this.dbPicture = this.findrMethods.sanitize(decodeURIComponent(user.Profile_picture));
        }
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
        this.appService.changeUsername(this.username).subscribe(() => {
            this.appService.getProfileFromServer()
        });
    }

    // Prepare file for upload in server.
    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];

        this.reader.readAsDataURL(file);

        this.reader.onload = () => {
            this.dbPicture = this.findrMethods.sanitize(this.reader.result.toString());
            this.appService.changeProfilePicture(this.reader.result).subscribe(() => {
                this.appService.getProfileFromServer()
            })
        };
    }
}
