import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Preferences} from '@capacitor/preferences';
import {User} from "../auth/user";
import {environment, INVENTORY_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  userStorage:User;
  accessToken:any;

  constructor(private http: HttpClient) {


  }

  async getLoggedInUser() {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });

    console.log(this.http.get(environment.uriAPI+INVENTORY_URL, { headers: headers }).subscribe((res: any) => {
      return res;
    }))
    return this.http.get(environment.uriAPI+INVENTORY_URL, { headers: headers })
  }


}
