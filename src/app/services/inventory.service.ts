import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Preferences} from '@capacitor/preferences';
import {User} from "../auth/user";
import {environment, INVENTORY_BY_USER_URL, INVENTORY_ITEM_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  userStorage:User;
  accessToken:any;

  constructor(private http: HttpClient) {


  }

  async getInventoriesByUserID() {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    console.log(this.userStorage.id)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(environment.uriAPI+INVENTORY_BY_USER_URL+`/${this.userStorage.id}`, { headers: headers })
  }


  async getInventoryItems(id: number) {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    console.log(this.userStorage.id)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    return this.http.get(environment.uriAPI+INVENTORY_ITEM_URL+`/${id}`, { headers: headers })
  }


}
