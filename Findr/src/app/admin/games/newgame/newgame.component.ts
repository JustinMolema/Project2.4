import { Component, OnInit } from '@angular/core';
import { AdmindataService } from '../../admindata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

class ImageSnippet {
    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'app-newgame',
    templateUrl: './newgame.component.html',
    styleUrls: ['./newgame.component.css']
})
export class NewgameComponent implements OnInit {
    hasFileBeenSelected: boolean = false;
    selectedFile: ImageSnippet;
    form: FormGroup;
    name;
    description;
    category;

    constructor(private admindataService: AdmindataService, private fb: FormBuilder) { 
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required]
        });
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
        this.hasFileBeenSelected = true;
    }

    addGame(){
        const val = this.form.value;
        this.admindataService.addGame(val.name, val.description, val.category).subscribe(response => console.log(response));
    }
}
