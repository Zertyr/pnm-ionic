import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilPage} from './profil.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilPage,
  },  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilPageRoutingModule {}
