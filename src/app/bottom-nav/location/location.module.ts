import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationPage } from './location.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { LocationPageRoutingModule } from './location-routing.module';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LocationPageRoutingModule
  ],
  declarations: [LocationPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocationPageModule {}
