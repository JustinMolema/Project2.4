import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }

    getSrc() {
        return this.src;
    }

    getFile() {
        return this.file;
    }
}

// TODO: fix setting new profile picture (only works on second try)
// TODO: fix displaying profile picture

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    hasFileBeenSelected = false;
    selectedFile: ImageSnippet;
    isEditEnable: boolean = false;

    User: any;
    Email: any;
    warningCount: any;
    DBpicture;

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
        this.loadInData()
    }

    async loadInData() {
        await this.appService.getProfile(this.appService.storedUserID).subscribe(res => {
            this.User = res[0].Username;
            this.Email = decodeURIComponent(res[0].Email);
            this.warningCount = res[0].Warnings;
            this.DBpicture = res[0].Profile_picture;
            if (this.DBpicture != null) {
                const reader = new FileReader();

                reader.onload = (e) => this.DBpicture = e.target.result;

                reader.readAsDataURL(new Blob([this.DBpicture.data]));

                this.hasFileBeenSelected = true;
            }
        });
    }

    onEdit() {
        if (this.isEditEnable) {
            this.submitNewUserName();
        }
        this.isEditEnable = !this.isEditEnable;
    }

    submitNewUserName() {
        this.appService.changeUsername(this.appService.storedUserID, this.User)
    }

    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
        });

        reader.readAsDataURL(file);

        this.hasFileBeenSelected = true;

        var prep = this.prepareImage(this.selectedFile)
        this.submitNewProfilePicture(prep)

    }

    async prepareImage(image) {
        var temp;
        await this.appService.getBlob(image).subscribe(res => {
            temp = res
        })
        return await temp
    }

    async submitNewProfilePicture(newProfilePicture) {
        await this.appService.changeProfilePicture(this.appService.storedUserID, newProfilePicture).subscribe(res => {
            console.log("Profile Pic Changed")
        })
    }
}
