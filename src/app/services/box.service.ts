import {Injectable} from '@angular/core';
import {User} from "../auth/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Preferences} from "@capacitor/preferences";
import {BOX_ITEM_URL, BOX_URL, environment, LASTBOX_USER} from "../../environments/environment";
import {ItemObject} from "../models/ItemObject";

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
  async generateBoxes(inventoryLabel: string, itemBox: Array<ItemObject>) {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });
      const box = {label: inventoryLabel, qrcode: "qrcode", user_id: this.userStorage.id};
      const body = [box,itemBox];

      console.log("box " + JSON.stringify(box));
      console.log("itemBox " + JSON.stringify(itemBox));
      console.log("body " + JSON.stringify(body));

      return this.http.post(environment.uriAPI + BOX_ITEM_URL, body, {headers: headers}).subscribe(value => {
        return value;
      })
    }
  }
}
