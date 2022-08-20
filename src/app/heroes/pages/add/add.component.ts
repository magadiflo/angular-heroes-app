import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent implements OnInit {

  publishers: Publisher[] = [Publisher.DCComics, Publisher.MarvelComics];
  hero: Hero = this.emptyHero;

  private get emptyHero(): Hero {
    return { id: '', superhero: '', publisher: Publisher.DCComics, alter_ego: '', first_appearance: '', characters: '', alt_img: '' };
  }


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    if (this.hero.superhero.trim().length === 0) return;
    if (this.hero.id) {
      this.heroesService.updateHero(this.hero)
        .subscribe(hero => this.hero = hero);
    } else {
      this.heroesService.saveHero(this.hero)
        .subscribe(hero => {
          this.router.navigate(['/heroes', 'edit', hero.id]);
        });
    }
  }

}
