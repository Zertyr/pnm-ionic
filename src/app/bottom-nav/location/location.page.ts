import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';


declare let google;
let map: any;
let infowindow: any;
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss']
})

export class LocationPage {
  
  
//GOOGLE MAP VARIABLES
@ViewChild('map') mapElement: ElementRef;
lat:any;
lng:any;
// //GOOGLE MAP VARIABLES FIN

  constructor(private http: HttpClient) {
  }

//GOOGLE MAP
  async ionViewDidEnter(){
     this.initMap();
  }

  async initMap() {
    let position = map;
    console.log('position', position);
    const coordinates = await Geolocation.getCurrentPosition();
    
      console.log('location : ',location);
      this.lat = coordinates.coords.latitude;
      console.log('this.lat : ',this.lat);

      this.lng = coordinates.coords.longitude;
      console.log('this.lng : ',this.lng);

      map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: coordinates.coords.latitude, lng: coordinates.coords.longitude},
        zoom: 15
      });
  
      infowindow = new google.maps.InfoWindow();
      let config = {
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ this.lat +'%2C'+ this.lng +'&radius=1500&type=car_rental&keyword=car_rental&key='+environment.YOUR_API_KEY,
        headers: { }
      };
      await CapacitorHttp.get(config)
      .then(res => {
        res.data.results.forEach(element => {
          if (element.status === google.maps.places.PlacesServiceStatus.OK) {
              this.createMarker(element);
          }
        });
        res.data.results.map(async (element, index) => {
          const marketObj:any = {};
          marketObj.id = index;
          marketObj.name = element.name;
          marketObj.photos = element.photos;
          marketObj.rating = element.rating;
          marketObj.vicinity = element.vicinity;
          marketObj.geometry = {
            location: {
              lat: element.geometry.location.lat,
              lng: element.geometry.location.lng
            }
          };
          await this.createMarker(marketObj);
        }
      )});

      let marker = new google.maps.Marker({
        map: map,
        position: {lat:this.lat,lng:this.lng},
        title: "Votre position"
      });
    
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("Votre position");
        infowindow.open(map, this);
      });
  }


  createMarker(place) {
    
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      position: {lat:place.geometry.location.lat,lng:place.geometry.location.lng},
      title: place.name
    });
  
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

}

