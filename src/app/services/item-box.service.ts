import { Injectable } from '@angular/core';
import {User} from "../auth/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Preferences} from "@capacitor/preferences";
import {environment, ITEM_BOX_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemBoxService {

  userStorage: User;
  accessToken: any;

  constructor(private http: HttpClient) {
  }

  /**
   * Post items in a box
   * @param item_id = id of the item to add
   * @param box_id = id of the box where to add the item
   * @param quantity = quantity of the item
   */
  async createItemBox(item_id: number, box_id: number, quantity: number) {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });

      const result = {item_id: item_id, box_id: box_id, quantity: quantity}

      console.log("VODY box_id: " + result)
      return this.http.post(environment.uriAPI + ITEM_BOX_URL, result, {headers: headers});
    }
  }
}
