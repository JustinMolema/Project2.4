import {Component, OnInit} from '@angular/core';
import {AppService} from 'src/app/app.service';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}

// TODO: change username inputveld needs styling

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

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
        this.appService.getProfile(this.appService.storedUserID).subscribe(res => {
            this.User = res[0].Username;
            this.Email = decodeURIComponent(res[0].Email);
            this.warningCount = res[0].Warnings;
        });
    }

    onEdit(){
        if (this.isEditEnable){
            this.submit();
        }
        this.isEditEnable =!this.isEditEnable;
    }

    submit(){
        this.appService.changeUsername(this.appService.storedUserID, this.User).subscribe(res => {
            console.log("Username changed")
        })
    }

    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', (event: any) => {
            this.selectedFile = new ImageSnippet(event.target.result, file);
        });

        reader.readAsDataURL(file);

        this.hasFileBeenSelected = true;
    }
}
