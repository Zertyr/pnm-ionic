import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewQrcodePage } from './view-qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: ViewQrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewQrcodePageRoutingModule {}
