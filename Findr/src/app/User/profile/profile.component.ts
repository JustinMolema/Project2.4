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

    user: any;
    email: any;
    warningCount: any;
    dbPicture;

    constructor(private appService: AppService, private sanitiser: DomSanitizer) {
    }

    ngOnInit(): void {
        this.loadInData()
    }

    loadInData() {
        this.appService.getProfile(this.appService.storedUserID).subscribe(res => {
            this.user = res[0].Username;
            this.email = decodeURIComponent(res[0].Email);
            this.warningCount = res[0].Warnings;
            this.dbPicture = this.sanitize(decodeURIComponent(res[0].pic));
            if (this.dbPicture !== null){
                this.hasFileBeenSelected = true;
            }
        });
    }

    sanitize(url: string) {
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
        this.appService.changeUsername(this.appService.storedUserID, this.user)
    }

    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];

        // this.reader.addEventListener('load', (event: any) => {
        //     this.selectedFile = new ImageSnippet(event.target.result, file);
        // });

        this.reader.readAsDataURL(file);

        this.hasFileBeenSelected = true;

        // var prep = this.prepareImage(this.selectedFile)
        // console.log("hallooooooo")
        // this.appService.getBlob(file).subscribe(res => {
        //     console.log("hoera")
        //     console.log(res)

        this.reader.onload = () =>{
            this.appService.changeProfilePicture(this.appService.storedUserID, this.reader.result).subscribe(res => {
                console.log("Profile Pic Changed")
                console.log(res)
            }, error => {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA")
                console.log(error)
            })
        }

        // }, error => {
        //     console.log("ik huil")
        //     console.log(error)
        // })

    }

    // prepareImage(image) {
    //     var temp;
    //
    //     return temp
    // }

    // async submitNewProfilePicture(newProfilePicture) {
    //     await this.appService.changeProfilePicture(this.appService.storedUserID, newProfilePicture).subscribe(res => {
    //         console.log("Profile Pic Changed")
    //     })
    // }
}
