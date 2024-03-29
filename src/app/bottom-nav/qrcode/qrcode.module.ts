import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {QrCodePage} from './qrcode.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import {QrCodePageRoutingModule} from './qrcode-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    QrCodePageRoutingModule,
    QRCodeModule
  ],
  declarations: [QrCodePage]
})
export class QrCodePageModule {}
