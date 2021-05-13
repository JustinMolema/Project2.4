import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class WrongPasswordHandler implements ErrorHandler {
    constructor() { }
    handleError(error) {
        // your custom error handling logic
        //console.log("PAPA")
        //alert("wrong password");
    }
}

@Injectable()
export class WrongUserNameHandler implements ErrorHandler {
    constructor() { }
    handleError(error) {
        // your custom error handling logic
        console.log("PAPA")
        alert("wrong Username");
    }
}
