import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListQrcodePage } from './list-qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: ListQrcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListQrcodePageRoutingModule {}
