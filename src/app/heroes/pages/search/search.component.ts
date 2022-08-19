import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

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
  heroSelected!: Hero;

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  searching(): void {
    this.heroService.getSuggestions(this.term)
      .subscribe(heroes => this.heroes = heroes);
  }

  optionSelected(value: MatAutocompleteSelectedEvent): void {
    const hero: Hero = value.option.value;
    this.term = hero.superhero;
    this.heroService.getHeroById(hero.id!)
      .subscribe(hero => this.heroSelected = hero);
  }
}
