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

/** 
 ** **** Diferencia entre canLoad y canActivate **** (Tomado de StackOverflow)
 ** El CanLoad Guard evita la carga del módulo lazy Loaded. 
 ** Generalmente usamos este guardia cuando no queremos que el usuario no autorizado 
 ** navegue a ninguna de las rutas del módulo y también se detenga entonces incluso a 
 ** ver el código fuente del módulo.
 **
 ** El Angular proporciona canActivate Guard, que evita que un usuario no autorizado acceda a la ruta. 
 ** Pero no impide que el módulo se descargue. El usuario puede usar la consola de desarrollador de Chrome 
 ** para ver el código fuente. CanLoad Guard impide que se descargue el módulo.
 ** 
 ** En realidad, CanLoad protege un módulo para ser cargado, pero una vez que el módulo está cargado, 
 ** el guardia CanLoad no hará nada. Supongamos que hemos protegido la carga de un módulo utilizando canLoad guard 
 ** para usuarios no autenticados. Cuando el usuario esté conectado, ese módulo será aplicable para ser cargado y 
 ** podremos navegar por las rutas secundarias configuradas por ese módulo. Pero cuando el usuario está desconectado, 
 ** el usuario aún podrá navegar por esas rutas secundarias porque el módulo ya está cargado. En este caso, 
 ** si queremos proteger las rutas hijas de usuarios no autorizados, también necesitamos usar canActivate guard.
 **
 **
 ** Utilice CanLoad antes de cargar AdminModule:
 ** {
 **   path: 'admin',
 **   loadChildren: 'app/admin/admin.module#AdminModule',
 **   canLoad: [ AuthGuardService ]
 ** },
 **
 ** Después de cargar AdminModule, en el módulo AdminRouting podemos usar CanActivate para 
 ** proteger a las rutas hijas de usuarios no autorizados como el siguiente:
 ** { 
 **   path: '',
 **   component: AdminComponent,
 **   children: [ 
 **     {
 **       path: 'person-list',
 **       component: PersonListComponent,
 **       canActivate: [ AuthGuardService ]
 **     }
 **   ]
 ** } 


 */