import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehicleInformationsPageRoutingModule } from './vehicle-informations-routing.module';

import { VehicleInformationsPage } from './vehicle-informations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehicleInformationsPageRoutingModule
  ],
  declarations: [VehicleInformationsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleInformationsPageModule {}
