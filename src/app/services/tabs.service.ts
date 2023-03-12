import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  
  private showTopBar: BehaviorSubject<boolean>  =  new  BehaviorSubject<boolean>(null);
  public _showTopBar = this.showTopBar;

  constructor() { }

  getShowTopBar(){
    return this._showTopBar;
  }

  setShowTopBar(value:boolean){
    this.showTopBar.next(value)
  }
}
