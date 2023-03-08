import { Injectable } from '@angular/core';
import {User} from "../auth/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Preferences} from "@capacitor/preferences";
import {BOX_URL, environment, LASTBOX_USER} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  userStorage: User;
  accessToken: any;

  constructor(private http: HttpClient) {
  }

  /**
   * Create a bow
   * @param inventoryLabel = name of the box
   */
  async generateBoxes(inventoryLabel: string) {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });

      const body = {label: inventoryLabel, qrcode: "qrcode", user_id: this.userStorage.id}

      return this.http.post(environment.uriAPI + BOX_URL, body, {headers: headers}).subscribe(value => {
        console.log("POST BOX : " + JSON.stringify(value))
      })
    }
  }

  /**
   * Get the last box created by the user
   */
  async getLastBoxFromTheUser() {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });
      return this.http.get(environment.uriAPI+LASTBOX_USER+`/${this.userStorage.id}`, {headers: headers})
    }
  }
}
