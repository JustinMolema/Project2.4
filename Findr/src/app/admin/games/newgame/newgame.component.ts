import {Component, Input, OnInit} from '@angular/core';
import {AdmindataService} from '../../admindata.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

    @Input() returnToGames: Function;
    @Input() game;
    name: string;

    constructor(private admindataService: AdmindataService, private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        if (this.game) this.setEditValues();
    }

    setEditValues(): void {
        this.form.controls.name.setValue(this.game.Name);
        this.form.controls.category.setValue(this.game.Category);
        this.form.controls.description.setValue(this.game.Description);
        this.name = this.game.Name;
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

    addGame(): void {
        const val = this.form.value;
        this.admindataService.addGame(val.name, val.description, val.category).subscribe(response => {
            this.submitGameForm(response, "Game has been added!");
        });
    }

    editGame(): void {
        const val = this.form.value;
        this.admindataService.editGame(this.name, val.description, val.category, val.name).subscribe(response => {
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
