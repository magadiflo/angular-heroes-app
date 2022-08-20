import { Component, OnInit } from '@angular/core';

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


  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.hero.superhero.trim().length === 0) return;
    this.heroesService.saveHero(this.hero)
      .subscribe(hero => this.hero = hero);
  }

}
