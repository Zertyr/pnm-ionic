import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage,
  },
  {
    path: 'listbox',
    loadChildren: () => import('./listbox/listbox.module').then( m => m.ListboxPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListPageRoutingModule {}
