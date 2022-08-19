import { Component, OnInit } from '@angular/core';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  term: string = '';
  heroes: Hero[] = [];

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
