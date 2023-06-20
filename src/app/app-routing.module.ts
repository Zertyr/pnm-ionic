import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { IntroGuard } from './guards/intro.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard, AutoLoginGuard] // Il check si il doit montrer l'introduction ou pas
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule),
    canLoad: [IntroGuard, AutoLoginGuard] // Il check si il doit montrer l'introduction ou pas
  },
  {
    path: 'lost-password',
    loadChildren: () => import('./auth/lost-password/lost-password.module').then( m => m.LostPasswordPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./bottom-nav/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'vehicle-informations',
    loadChildren: () => import('./pages/vehicle-informations/vehicle-informations.module').then( m => m.VehicleInformationsPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },





];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
