import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
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

    User = 'TheLegend27';
    Email = 'real@email.com';
    warningCount = 2;

    constructor(private appService: AppService) {
    }

    ngOnInit(): void {
        this.appService.getProfile(this.appService.storedUserID).subscribe(res =>{
                console.log(res)
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
