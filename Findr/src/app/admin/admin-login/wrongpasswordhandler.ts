import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class WrongPasswordHandler implements ErrorHandler {
    constructor() { }
    handleError(error): void {
        // your custom error handling logic
        // alert("wrong password");
    }
}

@Injectable()
export class WrongUserNameHandler implements ErrorHandler {
    constructor() { }
    handleError(error): void {
        alert("wrong Username");
    }
}
