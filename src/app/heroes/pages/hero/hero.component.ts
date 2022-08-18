import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
  ]
})
export class HeroComponent implements OnInit {

  hero!: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe({
        next: hero => this.hero = hero,
        error: err => this.router.navigate(['/heroes', 'list'])
      });
  }

}
