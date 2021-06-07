import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    hasFileBeenSelected = false;
    selectedFile: ImageSnippet;

    User: any;
    Email: any;
    warningCount: any;

    constructor(private appService: AppService) {}

    ngOnInit(): void {
        this.appService.getProfile(this.appService.storedUserID).subscribe(res => {
            console.log(res)
            this.User = res.Username;
            this.Email = res.Email;
            this.warningCount = res.Warnings;
        });
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
