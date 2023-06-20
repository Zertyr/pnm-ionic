import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QrCodePage} from './qrcode.page';

const routes: Routes = [
  {
    path: '',
    component: QrCodePage,
  },
  {
    path: 'list-qrcode',
    loadChildren: () => import('./list-qrcode/list-qrcode.module').then( m => m.ListQrcodePageModule)
  },
  {
    path: 'view-qrcode',
    loadChildren: () => import('./view-qrcode/view-qrcode.module').then( m => m.ViewQrcodePageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrCodePageRoutingModule {}
