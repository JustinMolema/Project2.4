import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';
import {DomSanitizer} from "@angular/platform-browser";

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
    reader = new FileReader();

    User: any;
    Email: any;
    warningCount: any;
    DBpicture;

    constructor(private appService: AppService, private sanitiser: DomSanitizer) {
    }

    ngOnInit(): void {
        this.loadInData()
    }

    loadInData() {
        this.appService.getProfile(this.appService.storedUserID).subscribe(res => {
            this.User = res[0].Username;
            this.Email = decodeURIComponent(res[0].Email);
            this.warningCount = res[0].Warnings;
            this.DBpicture = res[0].pic;

            if (this.DBpicture != null) {

                this.reader.onload = (e) => {
                    if (typeof e.target.result === "string") {
                        // var temp = this._arrayBufferToBase64(this.DBpicture)

                        var file = new File([this.DBpicture.data], "pic0")
                        this.DBpicture = new ImageSnippet(e.target.result, file);
                    }
                };
                // this.reader.readAsDataURL(this.DBpicture);
                this.hasFileBeenSelected = true;
            }
        });
    }

    sanitse(url:string){
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }

    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
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

        this.reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
        });

        this.reader.readAsDataURL(file);

        this.hasFileBeenSelected = true;

        var prep = this.prepareImage(this.selectedFile)
        this.submitNewProfilePicture(prep)

    }
    //
    // _arrayBufferToBase64( buffer ) {
    //     var binary = '';
    //     var bytes = new Uint8Array( buffer );
    //     var len = bytes.byteLength;
    //     for (var i = 0; i < len; i++) {
    //         binary += String.fromCharCode( bytes[ i ] );
    //     }
    //     return window.btoa( binary );
    // }

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
