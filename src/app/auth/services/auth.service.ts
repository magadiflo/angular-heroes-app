import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! }; //* Lo desestructuramos para asegurarnos de que no se cambiará accidentalmente por referencia
  }

  constructor(private http: HttpClient) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id.toString()))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.clear();
    this._auth = undefined;
  }

  verifyAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }


    //* ¡ATENCIÓN! en este punto, también se está retornando un Observable<boolean>
    //* Es decir, como dice Fernando Herrera: "el pipe con el map, siempre retorna el mismo observable, pero 
    //* el map transforma su respuesta, en este caso, a un valor booleano".
    //* Resumiendo, el map recibe un valor (auth) y retorna un valor distinto (boolean), pero
    //* aún sigue siendo un observable (ahora con un valor booleano), que es lo que la firma de este método necesita retornar.
    //* Además, en este punto no se ha realizado ninguna subscripción
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          console.log(auth);
          this._auth = auth;
          return true;
        })
      );
  }

}
