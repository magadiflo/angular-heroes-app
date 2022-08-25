import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.auth.id) {
    //   return true;
    // }
    // return false;
    console.log('Bloqueado por el AuthGuard - CanActivate()');
    return this._isAuthenticated();
  }

  /**
   ** canLoad(...), permite saber si se puede cargar un módulo.
   ** 
   ** return true, siempre que regrese un true, significa que dejará pasar.
   ** 
   ** ¡IMPORTANTE!, este método solo sirve para prevenir que el usuario CARGUE el módulo,
   ** si ya estaba previamente cargado la persona va a poder entrar
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    // if (this.authService.auth.id) {
    //   return true;
    // }
    // return false;
    console.log('Bloqueado por el AuthGuard - CanLoad()');
    return this._isAuthenticated();
  }

  private _isAuthenticated(): Observable<boolean> {
    return this.authService.verifyAuthentication()
      .pipe(
        tap(isAuthenticate => {
          if (!isAuthenticate) {
            this.router.navigate(['./auth', 'login'])
          }
        })
      );
  }

}
