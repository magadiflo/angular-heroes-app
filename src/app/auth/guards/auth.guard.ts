import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  /**
   ** canLoad(...), permite saber si se puede cargar un módulo.
   ** 
   ** return true, siempre que regrese un true, significa que dejará pasar.
   ** 
   ** ¡IMPORTANTE!, este método solo sirve para prevenir que el usuario CARGUE el módulo,
   ** si ya estaba previamente cargado la persona va a poder entrar
   */
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.auth.id) {
      return true;
    }
    console.log('Bloqueado por el AuthGuard');
    return false;
  }

}
