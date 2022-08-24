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
    canLoad: [AuthGuard], //* Le decimos si ¿puede cargar el módulo de héroes?, que use el AuthGuard para averiguarlo. Podemos usar tantos Guards como querramos
    canActivate: [AuthGuard], //* Para ver el funcionamiento del canActivate AuthGuard, ver las instrucciones de abajo
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

/**
 * * INSTRUCCIONES - ESCENARIO: Comprobar funcionamiento del canActivate: AuthGuard
 * * - Inicimamos la aplicación en la ruta: http://localhost:4200/404
 * * - Veremos la lista de opciones de menú, entre ellas tratamos de acceder al menú: Heroes List
 * * - Veremos que en consola se muestra: Bloqueado por el AuthGuard - CanLoad()
 * * - Ahora vamos al menú: login que nos llevará a esta ruta: http://localhost:4200/auth/login
 * * - Damos en el botón: Ingresar
 * * - Veremos la lista de héroes
 * * - Ahora, nos deslogueamos con el botón logout. Nos llevará a la ruta de login: http://localhost:4200/auth/login
 * * - En el navegador, clickear la flecha de retroceso <-
 * * - Al hacerlo nos debería mostrar el mensaje: Bloqueado por el AuthGuard - CanActivate()
 * * - Seguimos clickeando la flecha hasta llegar al menú de opciones
 * * - Tratamos de acceder nuevamente al menú: Heroes List
 * * - Como resultado, nos deberá mostrar también el mensaje: Bloqueado por el AuthGuard - CanActivate()
 * 
 */