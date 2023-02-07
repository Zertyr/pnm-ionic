import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListboxPageRoutingModule } from './listbox-routing.module';

import { ListboxPage } from './listbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListboxPageRoutingModule
  ],
  declarations: [ListboxPage]
})
export class ListboxPageModule {}
