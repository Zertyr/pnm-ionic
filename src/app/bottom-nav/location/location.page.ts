import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

const apiKey = 'AIzaSyDsKgB1J3eZdEwP5oyorhnLbhfO9OZucQU';
@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;


  constructor() {
  }

  async ionViewDidEnter(){
    await this.createMap();
  }

  
  async createMap(){
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      apiKey: apiKey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9
        },
        zoom:5
      }
    });
  }
}
