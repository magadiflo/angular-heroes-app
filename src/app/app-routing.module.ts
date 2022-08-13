import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  { 
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
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
