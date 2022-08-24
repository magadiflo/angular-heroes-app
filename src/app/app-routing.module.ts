import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canLoad: [AuthGuard] //* Le decimos si ¿puede cargar el módulo de héroes?, que use el AuthGuard para averiguarlo. Podemos usar tantos Guards como querramos
  },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes), //* Solo tendremos un forRoot(...) en toda la aplicación
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
