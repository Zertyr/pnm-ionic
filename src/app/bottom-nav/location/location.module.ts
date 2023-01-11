import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
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
  declarations: [LocationPage]
})
export class LocationPageModule {}
