import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListboxPage } from './listbox.page';

const routes: Routes = [
  {
    path: '',
    component: ListboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListboxPageRoutingModule {}
