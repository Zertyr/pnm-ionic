import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../list/list.module').then(m => m.ListPageModule)
      },
      {
        path: 'location',
        loadChildren: () => import('../location/location.module').then(m => m.LocationPageModule)
      },
      {
        path: 'qrCode',
        loadChildren: () => import('../qrcode/qrcode.module').then(m => m.QrCodePageModule)
      },
      {
        path: 'listBox',
        loadChildren: () => import('../qrcode/list-qrcode/list-qrcode.module').then(m => m.ListQrcodePageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('../profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
