import { Component, Input } from '@angular/core';

import { Hero } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [
    `mat-card {
      margin: 20px 10px 0px 10px;
    }`
  ]
})
export class HeroCardComponent {

  @Input() hero!: Hero;

}
