import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListQrcodePageRoutingModule } from './list-qrcode-routing.module';

import { ListQrcodePage } from './list-qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListQrcodePageRoutingModule
  ],
  declarations: [ListQrcodePage]
})
export class ListQrcodePageModule {}
