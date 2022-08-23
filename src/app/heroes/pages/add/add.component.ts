import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';

import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `img {
      width: 100%;
      border-radius: 5px;
    }`
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
    private heroesService: HeroesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;
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
        .subscribe(hero => {
          this.hero = hero;
          this.showSnackBar('Register updated successfully');
        });

    } else {
      this.heroesService.saveHero(this.hero)
        .subscribe(hero => {
          this.showSnackBar('Register created successfully');
          this.router.navigate(['/heroes', 'edit', hero.id]);
        });
    }
  }

  remove(): void {
    this.heroesService.removeHero(this.hero.id!)
      .subscribe(resp => this.router.navigate(['/heroes', 'list']));
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500
    });
  }

}
