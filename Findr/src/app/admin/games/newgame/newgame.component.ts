import {Component, Input, OnInit} from '@angular/core';
import {AdmindataService} from '../../admindata.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {sha512} from 'js-sha512';

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
    hasFileBeenSelected = false;
    selectedFile: ImageSnippet;
    form: FormGroup;

    reader = new FileReader();
    @Input() returnToGames: Function;
    @Input() game;
    name: string;
    dbPicture: any;
    constructor(private admindataService: AdmindataService, private fb: FormBuilder, private sanitiser: DomSanitizer) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            category: [Validators.required],
        });
    }

    ngOnInit(): void {
        if (this.game) this.setEditValues();
    }

    setEditValues(): void {
        this.form.controls.name.setValue(this.game.Name);
        this.form.controls.category.setValue(this.game.Category);
        this.form.controls.description.setValue(this.game.Description);

        this.dbPicture = this.sanitize(decodeURIComponent(this.game.Image));
        this.hasFileBeenSelected = true;

        this.name = this.game.Name;
    }

    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];
        this.reader = new FileReader();

        this.reader.readAsDataURL(file);
        this.hasFileBeenSelected = true;

        this.reader.onload = () => {
            this.dbPicture = this.sanitize(this.reader.result.toString());
            // this.appService.changeProfilePicture(this.reader.result).subscribe();
        };
    }

    // Allow retrieved URL to be displayed on page
    sanitize(url: string): SafeResourceUrl {
        return this.sanitiser.bypassSecurityTrustResourceUrl(url);
    }

    addGame(): void {
        const val = this.form.value;
        this.admindataService.addGame(val.name, val.description, val.category, this.reader.result).subscribe(response => {
            this.submitGameForm(response, "Game has been added!");
        });
    }

    editGame(): void {
        console.log("aaaaa");
        const val = this.form.value;
        this.admindataService.editGame(this.name, val.description, val.category, this.reader.result, val.name).subscribe(response => {
            this.submitGameForm(response, "Game has been modified!");
        });
    }

    submitGameForm(response, message): void {
        if (this.gameAlreadyExists(response))
            this.admindataService.openSnackbar("Game already exists");
        else {
            this.admindataService.openSnackbar(message);
            this.returnToGames();
        }
    }

    gameAlreadyExists(response): boolean {
        return response.status === "error";
    }
}
