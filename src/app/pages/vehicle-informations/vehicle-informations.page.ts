import { Component, OnInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';

@Component({
  selector: 'app-vehicle-informations',
  templateUrl: './vehicle-informations.page.html',
  styleUrls: ['./vehicle-informations.page.scss'],
})
export class VehicleInformationsPage implements OnInit {
  public vehicles: any;

  constructor(public vehiclesService: VehiclesService) { }

  ngOnInit(): void {
    this.dataVehicles();

  }
    dataVehicles = () => {
     this.vehiclesService.getVehicles().then(value => {
       value.subscribe(value1 => {
         this.vehicles = value1
         console.log(this.vehicles)
       })
    })
  }
}
