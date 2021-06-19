import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

    @Output()
    refresh: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

    refreshFriends(){
        this.refresh.emit('refreshfriendlist');
    }

}
