import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { environment, VEHICLES_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  accessToken:any;

  constructor(private http: HttpClient) { }

  async getVehicles() {
    this.accessToken = (await Preferences.get({key: 'ACCESS_TOKEN'})).value;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`
    });
    console.log('coucou');


    return this.http.get(environment.uriAPI+VEHICLES_URL, { headers: headers })
  }
}
