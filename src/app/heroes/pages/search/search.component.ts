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
  heroSelected: Hero | undefined;

  constructor(private heroService: HeroesService) { }

  ngOnInit(): void {
  }

  searching(): void {
    this.heroes = [];
    if (this.term.trim().length === 0) return;
    this.heroService.getSuggestions(this.term.trim())
      .subscribe(heroes => this.heroes = heroes);
  }

  optionSelected(value: MatAutocompleteSelectedEvent): void {
    if (!value.option.value) {
      this.heroSelected = undefined;
      return;
    }
    const hero: Hero = value.option.value;
    this.term = hero.superhero;
    this.heroService.getHeroById(hero.id!)
      .subscribe(hero => this.heroSelected = hero);
  }
}
