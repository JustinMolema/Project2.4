import {Component, Input, OnInit} from '@angular/core';
import {AdmindataService} from '../../admindata.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {sanitize} from "../../../sharedmodule/global.findr.methods";

@Component({
    selector: 'app-newgame',
    templateUrl: './newgame.component.html',
    styleUrls: ['./newgame.component.css']
})
export class NewgameComponent implements OnInit {
    hasFileBeenSelected = false;
    form: FormGroup;

    @Input() returnToGames: Function;
    @Input() game;
    name: string;
    dbPicture: any;
    picture: string;
    constructor(private admindataService: AdmindataService, private fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            category: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        if (this.game) this.setEditValues();
    }

    setEditValues(): void {
        this.form.controls.name.setValue(this.game.Name);
        this.form.controls.category.setValue(this.game.Category);
        this.form.controls.description.setValue(this.game.Description);

        this.picture = decodeURIComponent(this.game.Image);
        this.dbPicture = sanitize(this.picture);
        this.hasFileBeenSelected = true;

        this.name = this.game.Name;
    }

    processFile(imageInput: any): void {
        const file: File = imageInput.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        this.hasFileBeenSelected = true;

        reader.onload = () => {
            this.picture = reader.result.toString();
            this.dbPicture = sanitize(reader.result.toString());
            // this.appService.changeProfilePicture(this.reader.result).subscribe();
        };
    }

    addGame(): void {
        if (!this.hasFileBeenSelected) return;

        const val = this.form.value;

        this.admindataService.addGame(val.name, val.description, val.category, this.picture).subscribe(response => {
            this.submitGameForm(response, "Game has been added!");
        });
    }

    editGame(): void {
        const val = this.form.value;
        this.admindataService.editGame(this.name, val.description, val.category, this.picture, val.name).subscribe(response => {
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
