import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';

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

  hasFileBeenSelected: boolean = false;
  selectedFile: ImageSnippet;

  User: String = "TheLegend27";
  Email: String = "real@email.com";
  warningCount: number = 2;

  constructor() {
  }

  ngOnInit(): void {

  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);

    console.log(this.selectedFile.src)
    this.hasFileBeenSelected = true;
  }
}
