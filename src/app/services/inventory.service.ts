import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Preferences} from '@capacitor/preferences';
import {User} from "../auth/user";
import {
  environment,
  INVENTORY_BY_USER_URL,
  INVENTORY_ITEM_URL,
  INVENTORY_URL,
  LAST_INVENTORY_URL_BY_USER_ID, LAST_ITEM_URL
} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  userStorage: User;
  accessToken: any;

  constructor(private http: HttpClient) {

  }

  /**
   * Get Inventory items
   * @param id = id of the inventory
   */
  async getInventoryItems(id: number) {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });

      return this.http.get(environment.uriAPI + INVENTORY_ITEM_URL + `/${id}`, {headers: headers})
    }
  }

  /**
   * Get Inventories of the user with his ID
   */
  async getInventoriesByUserID() {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });

      return this.http.get(environment.uriAPI + INVENTORY_BY_USER_URL + `/${this.userStorage.id}`, {headers: headers})
    }
  }

  /**
   * Return last inventory created by the user
   */
  async getLastInventoryByUserID() {
    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });

      return this.http.get(environment.uriAPI + LAST_INVENTORY_URL_BY_USER_ID + `/${this.userStorage.id}`, {headers: headers})
    }
  }

  /**
   * Create a new inventory
   * @param label = name of the inventory; input returned by the user
   */
  async createNewInventory(label: string) {

    this.userStorage = JSON.parse((await Preferences.get({key: 'USER'})).value);
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    if (this.userStorage != null) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      });

      const body = {label: label, user_id: this.userStorage.id}

      return this.http.post(environment.uriAPI + INVENTORY_URL, body, {headers: headers}).subscribe(value => {
        console.log(value)
      })
    }
  }
}
