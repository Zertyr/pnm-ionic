import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleInformationsPage } from './vehicle-informations.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleInformationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleInformationsPageRoutingModule {}
