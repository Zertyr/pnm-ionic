import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../auth/user";
import {Preferences} from "@capacitor/preferences";
import {environment, ITEM_URL} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  userStorage: User;
  accessToken: any;

  constructor(private http: HttpClient) {
  }

  /**
   * Method POST to create a new item in a list
   * @param label = name of the new item
   * @param inventoryId = list where to push the item
   */
  async createNewItem(label: string, inventoryId: number) {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });

      const body = {label: label, inventory_id: inventoryId}

      return this.http.post(environment.uriAPI + ITEM_URL, body, {headers: headers})
    }
  }

  /**
   * Delete item
   * @param itemId
   */
  async deleteItem(itemId: number) {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;
    if (this.userStorage != null) {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });
      return this.http.delete(environment.uriAPI + ITEM_URL + `/${itemId}`, {headers: headers}).subscribe(value => {
        console.log(value)
      })
    }
  }
}
