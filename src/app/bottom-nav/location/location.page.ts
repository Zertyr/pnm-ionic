import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})
export class LocationPage {
  
//GOOGLE MAP VARIABLES
  @ViewChild('map') mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  coordinates:GeolocationCoordinates;
  places: Array<any> = [];
  @ViewChild('popover') popover;
  isPopoverOpen: Boolean = false;
  title: string;
  body: string;
//GOOGLE MAP VARIABLES FIN

  constructor(private http: HttpClient) {
  }

//GOOGLE MAP
  async ionViewDidEnter(){
    await this.createMap();
  }

  ionViewDidLeave(){
    if(this.newMap != undefined) { this.newMap.destroy(); }
  }
  
  async createMap(){
    this.coordinates = await (await Geolocation.getCurrentPosition()).coords;
    console.log('Current position:', this.coordinates);

    this.newMap = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.YOUR_API_KEY,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: this.coordinates.latitude,
          lng: this.coordinates.longitude
        },
        zoom:13
      }
    });
    await this.newMap.enableClustering();
    // Add a marker to the map
    const markerId = await this.newMap.addMarker({
      title: 'Your position',
      coordinate: {
        lat: this.coordinates.latitude,
        lng: this.coordinates.longitude
      }
    });
    this.GetPlace(this.coordinates);

    this.newMap.setOnMarkerClickListener(async(marker) => {
      console.log('marker : ' + JSON.stringify(marker));
      this.isPopoverOpen = true;
      this.title = marker.title;
      this.body = marker.snippet;
    });
  }

  GetPlace(coordinates:GeolocationCoordinates){

    var config = {
      method: 'get',
      url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ coordinates.latitude +'%2C'+ coordinates.longitude +'&radius=1500&type=car_rental&keyword=car_rental&key='+environment.YOUR_API_KEY,
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'GET'
       }
    };

    fetch(config.url)
    .then(res => res.json())
    .then(res => {
      res.results.map((element, index) => {
        const marketObj:any = {};
        marketObj.id = index;
        marketObj.name = element.name;
        marketObj.photos = element.photos;
        marketObj.rating = element.rating;
        marketObj.vicinity = element.vicinity;
        marketObj.marker = {
          latitude: element.geometry.location.lat,
          longitude: element.geometry.location.lng
        };
        console.log(marketObj);
        this.places.push(marketObj);
        console.log(this.places);

      })
    }).then(() => {
      this.places.forEach(async (place) => {
        console.log("place : " + JSON.stringify(place));
        const markerId = await this.newMap.addMarker({
          title: place.name,
          snippet: JSON.stringify(place.vicinity),
          coordinate: {
            lat: place.marker.latitude,
            lng: place.marker.longitude
          }
        })
      });
    })
  }
//GOOGLE MAP FIN

}
