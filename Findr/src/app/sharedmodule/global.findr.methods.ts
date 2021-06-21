import {FormGroup} from "@angular/forms";
import {SafeResourceUrl, DomSanitizer} from "@angular/platform-browser";



export function mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
    };
}

export function sanitize(url: string): SafeResourceUrl {
    return this.bypassSecurityTrustResourceUrl(url);
}
