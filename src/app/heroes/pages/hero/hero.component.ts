import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { startWith, of, map, catchError, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../../interfaces/heroes.interface';
import { AppResponse } from '../../interfaces/app-response.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
  ]
})
export class HeroComponent implements OnInit {

  heroState$!: Observable<AppResponse>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroState$ = this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id)),
        map((hero: Hero) => ({ appState: 'APP_LOADED', appData: hero })),
        startWith({ appState: 'APP_LOADING' }),
        catchError((error: HttpErrorResponse) => of({ appState: 'APP_ERROR', error }))
      );
  }

}
